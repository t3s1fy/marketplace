import React, { useContext, useState } from "react";
import { Context } from "../../index";
import s from "./styles/OrderCard.module.css";
import trueIcon from "../../assets/seller_profile_assets/true_icon.svg";
import falseIcon from "../../assets/seller_profile_assets/false_icon.svg";

const OrderCard = ({ order }) => {
  const { order: orderStore } = useContext(Context);

  return (
    <div className={s.card}>
      <p className={s.textBold}>{`#${order.number}`}</p>
      <p>{`${order.income}₽`}</p>
      <p>{`${order.profit}₽`}</p>
      <p>{order.orderTime}</p>
      <p>{order.date}</p>
      <img src={order.status === true ? trueIcon : falseIcon} alt="" />
    </div>
  );
};

export default OrderCard;
