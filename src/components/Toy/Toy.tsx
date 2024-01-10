import { MouseEventHandler } from "react";
import ToyInterface from "../../interfaces/ToyInterface";
import "./Toy.css"
import ModifyInput from '../ModifyInput/ModifyInput';

interface ToyProps {
    toy: ToyInterface,
    onSuppr: MouseEventHandler,
    onModify: CallableFunction,
}

const Toy = ({toy, onSuppr, onModify}:ToyProps) => {
    return (
        <li className="toy-section">
            <h2>{toy.label}</h2>
            <span> - {toy.year}</span>
            <p>Prix: {toy.price} €</p>
            <div className="controls">
                <button>Mettre au panier</button>
                <ModifyInput toy={toy} onSubmit={onModify}/>
                <button className="danger" onClick={onSuppr}>Supprimer</button>
            </div>
        </li>
    );
}

export default Toy;