import ToyInterface from "../../interfaces/ToyInterface";
import "./Toy.css"

interface ToyProps {
    toy: ToyInterface,
}

const Toy = ({toy}:ToyProps) => {
    return (
        <li className="toy-section">
            <h2>{toy.label}</h2>
            <span> - {toy.year}</span>
            <p>Prix: {toy.price} €</p>
            <div className="controls">
                <button>Mettre au panier</button>
                <button>Modifier</button>
                <button className="danger">Supprimer</button>
            </div>
        </li>
    );
}

export default Toy;