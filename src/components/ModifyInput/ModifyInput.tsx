import { useState } from "react";
import ToyInterface from "../../interfaces/ToyInterface";
import "./ModifyInput.css";

interface ModifyInputProps {
  onModify: CallableFunction,
  toy: ToyInterface,
}

const ModifyInput = ({ onModify, toy }: ModifyInputProps) => {
  const [hidden, setHidden] = useState<Boolean>(true);

  return (
    <div className="modify-input-wrapper" >
      <button onClick={() => { setHidden(!hidden) }}>{hidden ? "Modifier" : "Masquer le formulaire"}</button>
      {!hidden &&
        <form onSubmit={(e) => { onModify(e, e.target as HTMLFormElement, toy.id); setHidden(true); }}>
          <h3>Modifier l'article</h3>
          <div className="block">
            <label htmlFor="label">Titre</label>
            <input required={false} type="text" name="label" id="label" placeholder={toy.label} />
          </div>
          <div className="block">
            <label htmlFor="year">Année</label>
            <input required={false} type="number" min="1800" max="2024" step="1" name="year" id="year" placeholder={toy.year} />
          </div>
          <div className="block">
            <label htmlFor="price">Prix</label>
            <input required={false} type="number" min="0.02" max="9999" step="0.01" name="price" id="price" placeholder={String(toy.price)} />
          </div>
          <button type="submit">Mettre à jour l'article</button>
        </form>
      }
    </div>
  );
}

export default ModifyInput;