import { MouseEventHandler } from "react";
import ToyInterface from "../../interfaces/ToyInterface";
import "./Toy.css"
import ModifyInput from '../ModifyInput/ModifyInput';
import CartFetcher from "../../services/CartFetcher";

interface ToyProps {
    toy: ToyInterface,
    onSuppr: MouseEventHandler,
    onModify: CallableFunction,
}

const Toy = ({toy, onSuppr, onModify}:ToyProps) => {
    return (
        <li className="toy-section">
            <h3>{toy.label}</h3>
            <span> - {toy.year}</span>
            <p>Prix: {toy.price} €</p>
            <div className="controls">
                <button onClick={() => {CartFetcher.addToCart(toy)}}>Mettre au panier</button>
                <ModifyInput toy={toy} onModify={onModify}/>
                <button className="danger" onClick={onSuppr}>Supprimer</button>
            </div>
        </li>
    );
}

export default Toy;