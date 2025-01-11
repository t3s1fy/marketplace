import React, { useContext } from "react";
import s from "./styles/DeliveryCard.module.css";
import { Context } from "../../index";

const DeliveryCard = ({ item }) => {
  const { item: productStore } = useContext(Context);

  const product = productStore.items.find(
    (product) => product.id === item.productId,
  );

  return (
    <div className={s.card}>
      <div className={s.header}>
        <p className={s.orderDate}>Заказ от {item.date}</p>
        <p className={s.price}>
          К оплате: <span>{product.price}₽</span>
        </p>
      </div>
      <div className={s.main}>
        <img src={product.img} alt="Product Image" />
        <div className={s.info}>
          <p className={s.name}>{product.name}</p>
          <div className={s.status}>{item.status}</div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
