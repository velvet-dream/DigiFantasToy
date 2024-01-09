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
  // useEffect(() => {
  //   ToyFetcher.loadToys()
  //     .then((loadedToys: ToyInterface[]) => {
  //       setToys(loadedToys);
  //     })
  //     .catch((e: Error) => { console.error(e); })
  // })

  function onSortInputChangeHandle(value: string): void {
    if (["year", "label", "price"].includes(value)) {
      setSort(value);
    }
  }

  //function onAddInputHandle()

  return (
    <div className="App">
      <h1>Digi Vivre Ensemble</h1>
      <SortInput onChange={onSortInputChangeHandle} />
      <AddInput />
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
          <Toy key={toy.id} toy={toy} />
        )}
      </ul>
    </div>
  );
}

export default App;
