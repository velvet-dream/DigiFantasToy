import { useState } from "react";

interface AddInputProps {
    onSubmit: CallableFunction;
}

const AddInput = ({ onSubmit }:AddInputProps) => {
    const [hidden, setHidden] = useState<Boolean>(true);

    return (
        <div className="controls" >
            <button onClick={() => { setHidden(!hidden) }}>{hidden ? "Ajouter un nouvel article" : "Masquer le formulaire"}</button>
            {!hidden &&
                <form onSubmit={(e) => {onSubmit(e, e.target as HTMLFormElement); e.preventDefault()}}>
                    <h3>Ajouter un article</h3>
                    <div className="block">
                        <label htmlFor="label">Titre</label>
                        <input type="text" name="label" id="label" />
                    </div>
                    <div className="block">
                        <label htmlFor="year">Année</label>
                        <input type="number" min="1800" max="2024" step="1" placeholder="2010" name="year" id="year" />
                    </div>
                    <div className="block">
                        <label htmlFor="price">Prix</label>
                        <input type="number" min="0.02" max="9999" step="0.01" name="price" id="price" placeholder="9.99" />
                    </div>
                    <button type="submit">Ajouter l'article</button>
                </form>
            }
        </div>
    );
}

export default AddInput;