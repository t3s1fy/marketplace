import React, { useContext } from "react";
import styles from "../styles/NavBar.module.css";
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
    <header>
      <div className={styles.navbarTop}>
        <div className={styles.navbarTopRight}>
          <NavLink to={CONTACTS_ROUTE} className={styles.announcementText}>
            Контакты
          </NavLink>
          <NavLink to={HELPER_ROUTE} className={styles.announcementText}>
            Помощь
          </NavLink>
        </div>
      </div>
      <div className={styles.navbarBottom}>
        <div className={styles.logo}>
          <NavLink to={SHOP_ROUTE}>
            <img src={logo} alt="Логотип" />
          </NavLink>
        </div>
        {user.isAuth || user.isSeller || user.isAdmin ? (
          <>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Поиск..." />
              <button>
                <img src={search_icon} alt="search" />
              </button>
            </div>

            <div className={styles.icons}>
              <button>
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
              <button>
                <img src={more_icon} alt="more" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.searchBoxNotLogin}>
              <input type="text" placeholder="Поиск..." />
              <button>
                <img src={search_icon} alt="search" />
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.navLogBtn} onClick={linkToLog}>
                Войти в аккаунт
              </button>
              <button className={styles.navRegBtn} onClick={linkToReg}>
                Регистрация
              </button>
            </div>
            <div className={styles.iconsNotLogin}>
              <button>
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
              <button>
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
