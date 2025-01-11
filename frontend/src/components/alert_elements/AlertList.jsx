import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import s from "./styles/AlertList.module.css";
import alertLogo from "../../assets/alert_modal_icons/alert_image.svg";
import { Link, useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";
import PurcharesCard from "../purchares_elements/PurcharesCard";
import AlertCard from "./AlertCard";

const AlertList = observer(() => {
  const { item } = useContext(Context);

  const allAlerts = item.alert;

  if (allAlerts.length === 0) {
    return (
      <div className={s.noAlert}>
        <img src={alertLogo} alt="Alert Logo" />
        <p className={s.noPurchare}>В данный момент у вас нет уведомлений!</p>
        <Link to={SHOP_ROUTE} className={s.goHomeBtn}>
          Перейти на главную
        </Link>
      </div>
    );
  }

  return (
    <div className={s.alertList}>
      {allAlerts.map((alert) => (
        <AlertCard key={alert.id} item={alert} />
      ))}
    </div>
  );
});

export default AlertList;
