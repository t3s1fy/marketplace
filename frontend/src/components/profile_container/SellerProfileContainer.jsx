import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import s from "./SellerProfileContainer.module.css";
import lineMini from "../../assets/seller_profile_container_icons/line_mini.svg";
import items from "../../assets/seller_profile_container_icons/items_icon.svg";
import main from "../../assets/seller_profile_container_icons/main_icon.svg";
import message from "../../assets/seller_profile_container_icons/message_icon.svg";
import orders from "../../assets/seller_profile_container_icons/orders_icon.svg";
import settings from "../../assets/seller_profile_container_icons/settings_icon.svg";
import {
  SELLER_PROFILE_MESSAGE_ROUTE,
  SELLER_PROFILE_ORDERS_ROUTE,
  SELLER_PROFILE_PRODUCTS_ROUTE,
  SELLER_PROFILE_ROUTE,
  SELLER_PROFILE_SETTINGS_ROUTE,
} from "../../utils/consts";
import { useNavigate, useLocation } from "react-router-dom";

const SellerProfileContainer = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const buttons = [
    ["Главная", main, SELLER_PROFILE_ROUTE],
    ["Заказы", orders, SELLER_PROFILE_ORDERS_ROUTE],
    ["Товары", items, SELLER_PROFILE_PRODUCTS_ROUTE],
    ["Центр сообщений", message, SELLER_PROFILE_MESSAGE_ROUTE],
    ["Настройки", settings, SELLER_PROFILE_SETTINGS_ROUTE],
  ];

  const activeIndex = buttons.findIndex(
    ([, , route]) => route === location.pathname,
  );

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img src={lineMini} alt="line" />
        <div className={s.headerBlock}>
          <div className={s.userImage}>0_0</div>
          <p className={s.email}>vladimir.putin@mail.ru</p>
        </div>
      </div>
      <div className={s.main}>
        {buttons.map(([text, icon, route], index) => (
          <div
            key={index}
            onClick={() => handleClick(route)}
            className={`${s.btnBlock} ${activeIndex === index ? s.active : ""}`}
          >
            <div className={s.imageBlock}>
              <img src={icon} alt="icon" />
            </div>
            <p className={s.nameBtn}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SellerProfileContainer;
