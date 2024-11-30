import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [
      { id: 1, name: "Кроссовки" },
      { id: 2, name: "Футболки" },
    ];
    this._brands = [
      { id: 1, name: "Nike" },
      { id: 2, name: "Adidas" },
    ];
    this._items = [
      {
        id: 1,
        name: "Кроссовки Nike Air Jordan 1",
        price: 50000,
        rating: 5,
        img: ``,
      },
      {
        id: 2,
        name: "Кроссовки Nike Air Jordan 1",
        price: 50000,
        rating: 5,
        img: ``,
      },
      {
        id: 3,
        name: "Кроссовки Nike Air Jordan 1",
        price: 50000,
        rating: 5,
        img: ``,
      },
      {
        id: 4,
        name: "Кроссовки Nike Air Jordan 1",
        price: 50000,
        rating: 5,
        img: ``,
      },
    ];
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(items) {
    this._items = items;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get items() {
    return this._items;
  }
}
