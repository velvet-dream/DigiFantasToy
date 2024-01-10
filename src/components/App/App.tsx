import { useEffect, useState } from 'react';
import './App.css';
import ToyInterface from '../../interfaces/ToyInterface';
import Toy from '../Toy/Toy';
import ToyFetcher from '../../services/ToyFetcher';
import SortInput from '../SortInput/SortInput';
import AddInput from '../AddInput/AddInput';

function App() {
  const [toys, setToys] = useState<ToyInterface[]>([
    { id: 4, label: "Barbie fait de la bicyclette ", price: 9, year: "2012" },
    { id: 5, label: "Kapla - boîte de 1000", price: 15, year: "2005" },
    { id: 6, label: "Légo - boîte de 1000", price: 20, year: "2014"}
  ]);
  const [sort, setSort] = useState<String>("label")

  // à réactiver avec un json server fonctionnel
  useEffect(() => {
    ToyFetcher.loadToys()
      .then((loadedToys: ToyInterface[]) => {
        setToys(loadedToys);
      })
      .catch((e: Error) => { console.error(e); })
  })

  function onSortInputChangeHandle(value: string): void {
    if (["year", "label", "price"].includes(value)) {
      setSort(value);
    }
  }

  function onAddInputHandle(e:Event, form:HTMLFormElement): void {
    const label = form.elements[0] as HTMLInputElement;
    const year = form.elements[1] as HTMLInputElement;
    const price = form.elements[2] as HTMLInputElement;
    const art = { id: Math.trunc(Math.random()*1000000000), label: label.value, price: Number(price.value), year: year.value };
    const copy = [...toys, art];
    e.preventDefault();
    ToyFetcher.postToy(art)
    .then(() => {
      setToys(copy);
    })
    .catch((e: Error) => { console.error(e); })
  }

  function onDeleteInputHandle(toy: ToyInterface): void {
    if (!window.confirm("supprimer l'article' ?")) return;
    const index = toys.indexOf(toy);
    if (index > -1) {
      const copy = [...toys];
      // retire l'élément d'index 1 sans modifier l'array toyss original
      const newToys = copy.splice(index, 1);
      ToyFetcher.deleteToy(toys[index].id)
        .catch(e => {
          console.error(e);
        });
      setToys(newToys);
    }
  }

  function onModifyInputHandle(toyPatch: Partial<ToyInterface>): void {
    if (!toyPatch.id) return;
    const copy = [...toys];
    copy.forEach((toy) => {
      if (toyPatch.id === toy.id) {
        if (toyPatch.label) toy.label = toyPatch.label;
        if (toyPatch.price) toy.price = toyPatch.price;
        if (toyPatch.year) toy.year = toyPatch.year;
      }
    });
    setToys(copy);
    
  }

  return (
    <div className="App">
      <h1>Digi Vivre Ensemble</h1>
      <SortInput onChange={onSortInputChangeHandle} />
      <AddInput onSubmit={onAddInputHandle} />
      <ul className="toys-container">
        {toys.sort((a: ToyInterface, b: ToyInterface): number => {
          switch (sort) {
            case "price":
              return a.price - b.price;
            case "year":
              return b.year.localeCompare(a.year);
            default:
              return a.label.localeCompare(b.label);
          }
        }).map((toy: ToyInterface) =>
          <Toy key={toy.id} toy={toy} onSuppr={() => {onDeleteInputHandle(toy)}} onModify={onModifyInputHandle} />
        )}
      </ul>
    </div>
  );
}

export default App;
