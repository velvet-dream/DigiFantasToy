import { useEffect, useState } from 'react';
import './App.css';
import ToyInterface from '../../interfaces/ToyInterface';
import Toy from '../Toy/Toy';
import ToyFetcher from '../../services/ToyFetcher';
import SortInput from '../SortInput/SortInput';
import AddInput from '../AddInput/AddInput';
import FormHandleUtilities from '../../services/FormHandleUtilities';
import CartFetcher from '../../services/CartFetcher';
import CartArticle from '../CartArticle/CartArticle';

function App() {
  const [toys, setToys] = useState<ToyInterface[]>([]);
  const [cartArticles, setCartArticles] = useState<ToyInterface[]>([]);
  const [sort, setSort] = useState<String>("label")

  useEffect(() => {
    CartFetcher.loadCartArticles()
      .then((loadedArticles: ToyInterface[]) => {
        setCartArticles(loadedArticles);
        return ToyFetcher.loadToys();
      })
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

  function onAddInputHandle(e: Event, form: HTMLFormElement): void {
    const art = FormHandleUtilities.getToyFromForm(form, Math.trunc(Math.random() * 1000000000)) as ToyInterface;
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

  function onModifyInputHandle(e: Event, form: HTMLFormElement, toyId: number): void {
    if (!toyId) return;
    const toyPatch: Partial<ToyInterface> = FormHandleUtilities.getToyFromForm(form, toyId);
    e.preventDefault();
    const copy = [...toys];
    console.log(toyPatch);
    copy.forEach((toy) => {
      if (toyPatch.id === toy.id) {
        toyPatch.label = (toyPatch.label) ? toyPatch.label : toy.label;
        toyPatch.price = (toyPatch.price) ? toyPatch.price : toy.price;
        toyPatch.year = (toyPatch.year) ? toyPatch.year : toy.year;
      }
    });
    setToys(copy);
    ToyFetcher.patchToy(toyId, toyPatch);
  }

  // Calcule le total du panier
  function calculateCartTotal(): number {
    if (cartArticles.length === 0) return 0;
    return cartArticles.map((x:ToyInterface)=>x.price).reduce((pPrice, cPrice) => { return pPrice + cPrice; });
  }

  return (
    <main className="App">
      <h1>Digi Vivre Ensemble</h1>
      <section className='header-controls'>
        <div>
          <SortInput onChange={onSortInputChangeHandle} />
          <AddInput onSubmit={onAddInputHandle} />
        </div>
        <aside className='cart'>
          <h2>Votre Panier</h2>
          <ul>
            {cartArticles.sort((a: ToyInterface, b: ToyInterface) => {
              return a.label.localeCompare(b.label);
            }).map((toy: ToyInterface) =>
              <CartArticle key={toy.id} toy={toy} />
            )}
            <p>Total : {calculateCartTotal()} €</p>
          </ul>
        </aside>
      </section>
      <h2 className='title'>Les jouets en vente</h2>
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
          <Toy key={toy.id} toy={toy} onSuppr={() => { onDeleteInputHandle(toy) }} onModify={onModifyInputHandle} />
        )}
      </ul>
    </main>
  );
}

export default App;
