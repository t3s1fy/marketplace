import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = true;
    this._isAdmin = false;
    this._isSeller = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setAdmin(bool) {
    this._isAdmin = bool;
  }

  setSeller(bool) {
    this._isSeller = bool;
  }

  setUser(user) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get isSeller() {
    return this._isSeller;
  }
}
