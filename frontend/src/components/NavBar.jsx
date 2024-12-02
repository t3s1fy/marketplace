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

import { NavLink, useNavigate } from "react-router-dom";
import {
  BASKET_ROUTE,
  CONFIRM_EMAIL_ROUTE,
  CONTACTS_ROUTE,
  HELPER_ROUTE,
  LOGIN_ROUTE,
  MAKING_ORDER_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE,
  WISHLIST_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate(); // Инициализируем хук для навигации

  const linkToLog = () => {
    // Переходим на страницу подтверждения email
    navigate(LOGIN_ROUTE);
  };

  const linkToReg = () => {
    // Переходим на страницу подтверждения email
    navigate(REGISTRATION_ROUTE);
  };
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
        {user.isAuth || user.isSeller || user.isAdmin ? (
          <>
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
          </>
        ) : (
          <>
            <div className="search-box-not-login">
              <input type="text" placeholder="Поиск..." />
              <button className="search-btn">
                <img src={search_icon} alt="search" />
              </button>
            </div>
            <div className="button-container">
              <button className="nav-log-btn" onClick={linkToLog}>
                Войти в аккаунт
              </button>
              <button className="nav-reg-btn" onClick={linkToReg}>
                Регистрация
              </button>
            </div>
            <div className="icons-not-login">
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
          </>
        )}
      </div>
    </header>
  );
});

export default NavBar;
