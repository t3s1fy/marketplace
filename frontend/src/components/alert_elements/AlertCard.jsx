import React, { useContext, useState } from "react";
import { Context } from "../../index";
import s from "./styles/AlertCard.module.css";
import cross from "../../assets/alert_modal_icons/cross.svg";

const AlertCard = ({ item }) => {
  const { item: productStore } = useContext(Context);

  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    productStore.removeAlert(item.id); // Удаление уведомления из хранилища
  };

  return (
    <div className={open ? `${s.card} ${s.open}` : s.card}>
      <div className={open ? `${s.header} ${s.open}` : s.header}>
        <button className={s.delBtn} onClick={handleDelete}>
          <img src={cross} alt="cross" />
        </button>
        <p className={s.title}>{item.title}</p>
        <div className={s.infoBlock}>
          <p className={s.date}>
            {item.date} {item.time}
          </p>
          <button onClick={() => setOpen(!open)} className={s.openBtn}>
            {open ? "свернуть" : "подробнее"}
          </button>
        </div>
      </div>
      {open ? (
        <div className={s.main}>
          <p>{item.content}</p>
        </div>
      ) : null}
    </div>
  );
};

export default AlertCard;
