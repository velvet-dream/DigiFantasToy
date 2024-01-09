import ToyInterface from "../interfaces/ToyInterface";

export default class ToyFetcher {
    static url: string = 'http://localhost:5500/toys';

    static loadToys(): Promise<ToyInterface[]> {
        return fetch(this.url)
            .then((r: Response) => {
                if (r.status === 200) return r.json();
                else throw new Error("Server didn't response excpectedly. Error: " + r.status)
            })
            .then((toys: ToyInterface[]) => {
                return toys;
            })
    }

    /**
   * Permet de modifier un article
   */
  static patchToy(toyId: number, propertyToPatch: Partial<ToyInterface>): Promise<void> {
    return fetch(`${this.url}/${toyId}`,
      {
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        method: "PATCH",
        body: JSON.stringify(propertyToPatch)
      })
      .then((r: Response): void => {
        if (r.status === 200) console.log("Patched toy with response ", r)
        else throw new Error(`Invalid HTTP request response: ${r.status}`);
      })
  }

  /**
   * Permet de ajouter un article
   */
  static postToy(toy: Omit<ToyInterface, "id">): Promise<void> {
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
      .catch((e: Error): void => {
        console.error("Error in ToyFetcher.postToy ", e);
      })
  }

  static deleteToy(toyId: number): Promise<void> {
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
      .catch((e: Error): void =>  {
        console.error(e);
      })
  }
}
