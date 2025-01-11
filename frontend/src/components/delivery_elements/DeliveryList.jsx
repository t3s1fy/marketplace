import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import s from "./styles/DeliveryList.module.css";
import FeedbackCard from "../feedback_elements/FeedbackCard";
import DeliveryCard from "./DeliveryCard";

const DeliveryList = observer(() => {
  const { item } = useContext(Context);

  const allDelivery = item.delivery;

  if (allDelivery.length === 0) {
    return (
      <p className={s.noDelivery}>
        Ой, здесь пусто! Кажется, вы ещё не заказали товары.
      </p>
    );
  }

  return (
    <div className={s.deliveryList}>
      {allDelivery.map((delivery) => (
        <DeliveryCard key={delivery.id} item={delivery} />
      ))}
    </div>
  );
});

export default DeliveryList;
