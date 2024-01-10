import ToyInterface from "../interfaces/ToyInterface";
import ToyFetcher from "./ToyFetcher";

export default class CartFetcher {
  static baseUrl: string = 'http://localhost:3001';
  static url: string = this.baseUrl + '/cartArticles';

  static loadCartArticles(): Promise<ToyInterface[]> {
    return fetch(this.url)
      .then((r: Response) => {
        if (r.status === 200) return r.json();
        else throw new Error("Server didn't response excpectedly. Error: " + r.status)
      })
      .then((toys: ToyInterface[]) => {
        return toys;
      })
  }

  static addToCart(toy:ToyInterface) {
    this.postCartArticle(toy)
      .then(
        () => { return ToyFetcher.deleteToy(toy.id); }
      )
      .catch((e: Error): void => {
        console.error(e);
      })
  }

  static removeFromCart(toy:ToyInterface) {
    ToyFetcher.postToy(toy)
      .then(
        () => { return this.deleteCartArticle(toy.id); }
      )
      .catch((e: Error): void => {
        console.error(e);
      })
  }

  /**
   * Permet de ajouter un article
   */
  static postCartArticle(toy: ToyInterface): Promise<void> {
    return fetch(`${this.url}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(toy)
      })
      .then((r: Response): void => {
        if (r.status === 200 || r.status === 201) console.log("Posted toy with response", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
      
  }

  static deleteCartArticle(toyId: number): Promise<void> {
    return fetch(`${this.url}/${toyId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
      .then((r: Response): void => {
        if (r.status === 200) console.log("Deleted toy with response ", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
      .catch((e: Error): void => {
        console.error(e);
      })
  }
}