import { makeAutoObservable, runInAction } from "mobx";

export default class OrderStore {
  constructor() {
    this._order = [
      {
        id: 1,
        number: 1,
        income: 1000,
        profit: 870,
        orderTime: "12:00",
        date: "07/01/25",
        status: true,
      },
      {
        id: 2,
        number: 2,
        income: 1000,
        profit: 870,
        orderTime: "12:37",
        date: "06/02/25",
        status: true,
      },
      {
        id: 3,
        number: 3,
        income: 1000,
        profit: 870,
        orderTime: "13:40",
        date: "06/01/24",
        status: false,
      },
    ];

    makeAutoObservable(this);
  }

  setOrders(order) {
    this._order = order;
  }

  get order() {
    return this._order;
  }
}
