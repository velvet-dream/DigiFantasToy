import ToyInterface from "../interfaces/ToyInterface";

export default class FormHandleUtilities {
  static getToyFromForm(form: HTMLFormElement, toyId: number): Partial<ToyInterface> {
    const label = form.elements[0] as HTMLInputElement;
    const year = form.elements[1] as HTMLInputElement;
    const price = form.elements[2] as HTMLInputElement;
    return { id: toyId, label: label.value, year: year.value, price: Number(price.value)};
  }
}