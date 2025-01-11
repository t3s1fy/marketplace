import React, { useContext } from "react";
import s from "./styles/PurcharesList.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import DeliveryCard from "../delivery_elements/DeliveryCard";
import PurcharesCard from "./PurcharesCard";

const PurcharesList = observer(() => {
  const { item } = useContext(Context);

  const allPurchares = item.purchare;

  if (allPurchares.length === 0) {
    return (
      <p className={s.noPurchare}>
        Ой, здесь пусто! Кажется, вы ещё не заказали товары.
      </p>
    );
  }

  return (
    <div className={s.PurcharesList}>
      {allPurchares.map((purchare) => (
        <PurcharesCard key={purchare.id} item={purchare} />
      ))}
    </div>
  );
});

export default PurcharesList;
