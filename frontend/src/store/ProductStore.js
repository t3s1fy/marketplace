import { makeAutoObservable } from "mobx";

export default class ProductStore {
  constructor() {
    this._types = [
      { id: 1, name: "Автомобили и мотоциклы" },
      { id: 2, name: "Антиквариат и коллекционирование" },
      { id: 3, name: "Бытовая химия и уборка" },
      { id: 4, name: "Бытовая техника" },
      { id: 5, name: "Дача, сад и огород" },
      { id: 6, name: "Детские товары" },
      { id: 7, name: "Домашний декор и текстиль" },
      { id: 8, name: "Животные и зоотовары" },
      { id: 9, name: "Игры и хобби" },
      { id: 10, name: "Инструменты и стройматериалы" },
      { id: 11, name: "Канцтовары и товары для офиса" },
      { id: 12, name: "Книги, печатные издания и медиа" },
      { id: 13, name: "Компьютеры и электроника" },
      { id: 14, name: "Красота и здоровье" },
      { id: 15, name: "Мебель" },
      { id: 16, name: "Мода и аксессуары" },
      { id: 17, name: "Музыкальные инструменты" },
      { id: 18, name: "Продукты питания и напитки" },
      { id: 19, name: "Спорт и активный отдых" },
      { id: 20, name: "Телефоны и аксессуары" },
      { id: 21, name: "Товары для дома" },
      { id: 22, name: "Товары для праздников" },
      { id: 23, name: "Туризм и путешествия" },
      { id: 24, name: "Электроника и умный дом" },
    ];
    this._brands = [
      { id: 1, name: "Nike" },
      { id: 2, name: "Adidas" },
    ];
    this._items = [
      {
        id: 1,
        name: "Кроссовки Nike Air Jordan 1",
        price: 228,
        rating: 5,
        discount: 20,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 2,
        name: "Массажное масло с ароматом чеснока...",
        price: 5000,
        rating: 5,
        discount: 1,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 3,
        name: "Кроссовки Nike Air Jordan 1",
        price: 5000,
        discount: 10,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 4,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 10,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 5,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 6,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 0,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 7,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 8,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 9,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 10,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 11,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
      {
        id: 12,
        name: "Надувная кукла Виктория нуланд",
        price: 1000,
        discount: 1,
        rating: 5,
        img: `https://avatars.mds.yandex.net/i?id=462f5e52e81b45e7006bff7d7320d63850138d666f8ad63a-13239233-images-thumbs&n=13`,
      },
    ];
    const savedFavorites = localStorage.getItem("favorites");
    this._favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    makeAutoObservable(this);
  }

  // Метод для сохранения избранных товаров в localStorage
  saveFavoritesToLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(this._favorites));
  }

  // Методы для работы с избранным
  toggleFavorite(productId) {
    if (this._favorites.includes(productId)) {
      this._favorites = this._favorites.filter((id) => id !== productId);
    } else {
      this._favorites.push(productId);
    }
    this.saveFavoritesToLocalStorage(); // После изменения сохраняем в localStorage
  }

  isFavorite(productId) {
    return this._favorites.includes(productId);
  }

  setFavorites(favorites) {
    this._favorites = favorites;
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setItems(items) {
    this._items = items;
  }

  get favorites() {
    return this._favorites;
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
