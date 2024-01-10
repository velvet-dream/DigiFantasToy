import { useState } from "react";
import ToyInterface from "../../interfaces/ToyInterface";

interface AddInputProps {
  onSubmit: CallableFunction,
  toy: ToyInterface,
}

const AddInput = ({ onSubmit, toy }: AddInputProps) => {
  const [hidden, setHidden] = useState<Boolean>(true);

  return (
    <div className="" >
      <button onClick={() => { setHidden(!hidden) }}>{hidden ? "Modifier" : "Masquer le formulaire"}</button>
      {!hidden &&
        <form onSubmit={(e) => { onSubmit(e, e.target as HTMLFormElement); e.preventDefault() }}>
          <h3>Modifier l'article</h3>
          <div className="block">
            <label htmlFor="label">Titre</label>
            <input type="text" name="label" id="label" value={toy.label} />
          </div>
          <div className="block">
            <label htmlFor="year">Année</label>
            <input type="number" min="1800" max="2024" step="1" name="year" id="year" value={toy.year} />
          </div>
          <div className="block">
            <label htmlFor="price">Prix</label>
            <input type="number" min="0.02" max="9999" step="0.01" name="price" id="price" value={toy.price} />
          </div>
          <button type="submit">Mettre à jour l'article</button>
        </form>
      }
    </div>
  );
}

export default AddInput;