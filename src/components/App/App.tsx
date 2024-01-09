import React, { useEffect, useState } from 'react';
import './App.css';
import ToyInterface from '../../interfaces/ToyInterface';
import Toy from '../Toy/Toy';
import ToyFetcher from '../../services/ToyFetcher';

function App() {
  const [toys, setToys] = useState<ToyInterface[]>([]);

  useEffect(() => {
    ToyFetcher.loadToys()
      .then((loadedToys: ToyInterface[]) => {
        setToys(loadedToys);
      })
      .catch((e: Error) => { console.error(e); })
  })

  return (
    <div className="App">
      <h1>Digi Vivre Ensemble</h1>
      <ul>
        {toys.sort((a:ToyInterface, b:ToyInterface): number => {
          return a.label.localeCompare(b.label);
        }).map((toy: ToyInterface) =>
          <Toy key={toy.id} toy={toy}/>
        )}
      </ul>
    </div>
  );
}

export default App;
