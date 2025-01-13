import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import OrderStore from "./store/OrderStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      item: new ProductStore(),
      order: new OrderStore(),
    }}
  >
    <App />
  </Context.Provider>,
);
