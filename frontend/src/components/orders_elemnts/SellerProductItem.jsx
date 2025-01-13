import React, { useContext } from "react";
import { Context } from "../../index";
import s from "./styles/SellerProductItem.module.css";
import pen from "../../assets/seller_profile_assets/pen_icon.svg";
import basket from "../../assets/seller_profile_assets/basket_icon.svg";

const SellerProductItem = ({ item }) => {
  const { item: productStore } = useContext(Context);
  console.log(item.name);
  return (
    <div className={s.card}>
      <img src={item.img} alt="" />
      <p>{item.name}</p>
      <p>{item.name}</p>
      <p>{item.name}</p>
      <p>{item.count}</p>
      <p>{item.price}</p>
      <div>
        <button>
          <img src={pen} alt="" />
        </button>
        <button>
          <img src={basket} alt="" />
        </button>
      </div>
    </div>
  );
};

export default SellerProductItem;
