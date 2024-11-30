import React, { useContext } from "react";
import "../styles/NavBar.css";
import { Context } from "../index";

import logo from "../assets/icons/marketpalceLogo.png";
import search_icon from "../assets/icons/search_icon.svg";
import alert_icon from "../assets/icons/alert_Icon.svg";
import heart_icon from "../assets/icons/heart_icon.svg";
import basket_icon from "../assets/icons/basket_icon.svg";
import more_icon from "../assets/icons/more_icon.svg";
import profile_icon from "../assets/icons/profile_icon.svg";
import settings_icon from "../assets/icons/settings_icon.svg";

import { NavLink } from "react-router-dom";
import {
  BASKET_ROUTE,
  CONTACTS_ROUTE,
  HELPER_ROUTE,
  MAKING_ORDER_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE,
  WISHLIST_ROUTE,
} from "../utils/consts";

const NavBar = () => {
  const { user } = useContext(Context);
  return (
    <header className="header_1">
      <div className="navbar_top">
        <div className="navbar-top-right">
          <NavLink to={CONTACTS_ROUTE} className="announcement-text">
            Контакты
          </NavLink>
          <NavLink to={HELPER_ROUTE} className="announcement-text">
            Помощь
          </NavLink>
        </div>
      </div>
      <div className="navbar-bottom">
        <div className="logo">
          <NavLink to={SHOP_ROUTE}>
            <img src={logo} alt="Логотип" />
          </NavLink>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Поиск..." />
          <button className="search-btn">
            <img src={search_icon} alt="search" />
          </button>
        </div>

        <div className="icons">
          <button className="notification-button">
            <img src={alert_icon} alt="alert" />
          </button>
          <NavLink to={BASKET_ROUTE}>
            <img src={basket_icon} alt="basket" />
          </NavLink>
          <NavLink to={WISHLIST_ROUTE}>
            <img src={heart_icon} alt="Wishlist" />
          </NavLink>
          <NavLink to={PROFILE_ROUTE}>
            <img src={profile_icon} alt="Profile" />
          </NavLink>
          <NavLink to={SETTINGS_ROUTE}>
            <img src={settings_icon} alt="Settings" />
          </NavLink>
          <button className="more-button">
            <img src={more_icon} alt="more" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
