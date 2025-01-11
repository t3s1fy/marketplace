import React, { useContext } from "react";
import { Context } from "../../index";
import s from "./styles/PurcharesCard.module.css";

const PurcharesCard = ({ item }) => {
  const { item: productStore } = useContext(Context);

  const product = productStore.items.find(
    (product) => product.id === item.productId,
  );

  return (
    <div className={s.card}>
      <div className={s.header}>
        <p className={s.orderDate}>Заказ от {item.date}</p>
        <p className={s.price}>
          {item.purchareStatus}: <span>{product.price}₽</span>
        </p>
      </div>
      <div className={s.main}>
        <img src={product.img} alt="Product Image" />
        <div className={s.info}>
          <p className={s.name}>{product.name}</p>
          <div className={s.divBlock}>
            <div className={s.status}>{item.status}</div>
            <button className={s.rateBtn}>Оценить товар</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurcharesCard;
