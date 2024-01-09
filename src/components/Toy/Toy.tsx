import ToyInterface from "../../interfaces/ToyInterface";

interface ToyProps {
    toy: ToyInterface,
}

const Toy = ({toy}:ToyProps) => {
    return (
        <li className="toy-section">
            <h2>{toy.label}</h2>
            <span>{toy.year}</span>
            <p>Prix: {toy.price}</p>
        </li>
    );
}

export default Toy;