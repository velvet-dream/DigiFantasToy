import ToyInterface from "../../interfaces/ToyInterface";
import CartFetcher from "../../services/CartFetcher";
import "./CartArticle.css"

interface CartArticleProps {
  toy: ToyInterface
}

const CartArticle = ({toy}:CartArticleProps) => {
  return (
    <li className="cart-line">
      <b>{toy.label}</b>
      <span> - {toy.year}</span>
      <p>Prix: {toy.price} €</p>
      <div className="controls">
        <button onClick={() => {
          CartFetcher.removeFromCart(toy);
        }}>Retirer du panier</button>
      </div>
    </li>
  );
}

export default CartArticle;