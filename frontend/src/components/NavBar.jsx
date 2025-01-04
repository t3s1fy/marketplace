import React, { useContext, useRef, useState, useEffect } from "react";
import styles from "../styles/NavBar.module.css";
import { Context } from "../index";
import { UseClickOutside } from "./hooks/useClickOutside";
import logo from "../assets/icons/marketpalceLogo.png";
import search_icon from "../assets/icons/search_icon.svg";
import alert_icon from "../assets/icons/alert_Icon.svg";
import heart_icon from "../assets/icons/heart_icon.svg";
import basket_icon from "../assets/icons/basket_icon.svg";
import more_icon from "../assets/icons/more_icon.svg";
import profile_icon from "../assets/icons/profile_icon.svg";
import settings_icon from "../assets/icons/settings_icon.svg";

import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_PANEL_MAIN_ROUTE,
  ADMIN_ROUTE,
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
  const [isBottomFixed, setBottomFixed] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setIsScrolled(currentScrollPos > 0);

      if (currentScrollPos > prevScrollPos) {
        // Скролл вниз
        setBottomFixed(true);
      } else if (currentScrollPos < 60) {
        // Возврат в исходное состояние при выполнении условия
        setBottomFixed(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  //меню профиля
  const [isOpen, setOpen] = useState(false);
  const [isOpenAl, setOpenAl] = useState(false);
  const { user } = useContext(Context);
  const navigate = useNavigate(); // Инициализируем хук для навигации

  const menuRef = useRef(null);
  const menuRefAl = useRef(null);
  const buttonRef = useRef(null); // Добавим реф для кнопки открытия меню
  const buttonRefAl = useRef(null);

  UseClickOutside(menuRef, buttonRef, () => {
    if (isOpen) setOpen(false);
  });

  UseClickOutside(menuRefAl, buttonRefAl, () => {
    if (isOpenAl) setOpenAl(false);
  });

  const linkToLog = () => {
    // Переходим на страницу подтверждения email
    navigate(LOGIN_ROUTE);
  };

  const linkToReg = () => {
    // Переходим на страницу подтверждения email
    navigate(REGISTRATION_ROUTE);
  };

  const menuLinkToLog = () => {
    // Переходим на страницу подтверждения email и закрываем меню
    navigate(LOGIN_ROUTE);
    setTimeout(() => setOpen(false), 50);
  };

  const menuLinkToReg = () => {
    // Переходим на страницу подтверждения email и закрываем меню
    navigate(REGISTRATION_ROUTE);
    setTimeout(() => setOpen(false), 50);
  };
  console.log("Is Authenticated:", user.isAuth);

  return (
    <header>
      <div className={styles.navbarTop}>
        <div className={styles.navbarTopRight}>
          {user.isAdmin ? (
            <NavLink
              to={ADMIN_PANEL_MAIN_ROUTE}
              className={styles.announcementText}
            >
              Админ-панель
            </NavLink>
          ) : null}
          <NavLink to={CONTACTS_ROUTE} className={styles.announcementText}>
            Контакты
          </NavLink>
          <NavLink to={HELPER_ROUTE} className={styles.announcementText}>
            Помощь
          </NavLink>
        </div>
      </div>
      <div
        className={`${styles.navbarBottom} ${isBottomFixed ? styles.fixed : ""}`}
      >
        <div className={styles.logo}>
          <NavLink to={SHOP_ROUTE}>
            <img src={logo} alt="Логотип" />
          </NavLink>
        </div>
        <button className={styles.catalogBtn}>
          <img src={more_icon} alt="more" />
          <span>Каталог</span>
        </button>
        {user.isAuth ? (
          <>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Поиск..." />
              <button>
                <img src={search_icon} alt="search" />
              </button>
            </div>

            <div className={styles.icons}>
              <button
                className={styles.iconButton}
                onClick={() => setOpenAl(!isOpenAl)}
                ref={buttonRefAl}
              >
                <img src={alert_icon} alt="alert" />
              </button>
              <nav
                className={`${styles.alertMenu} ${isOpenAl ? styles.active : ""} ${isScrolled ? styles.scroll : ""}`}
                ref={menuRefAl}
              >
                <div className={styles.alertList}>
                  <p className={styles.alertText}>Уведомления</p>
                  <div className={styles.alertBody}></div>
                </div>
              </nav>
              <Link to={user.isAuth ? PROFILE_ROUTE : LOGIN_ROUTE}>
                <img src={profile_icon} alt="Profile" />
              </Link>
              <Link to={BASKET_ROUTE}>
                <img src={basket_icon} alt="basket" />
              </Link>
              <Link to={WISHLIST_ROUTE}>
                <img src={heart_icon} alt="Wishlist" />
              </Link>
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
              <button
                className={styles.iconButton}
                onClick={() => setOpenAl(!isOpenAl)}
                ref={buttonRefAl}
              >
                <img src={alert_icon} alt="alert" />
              </button>
              <nav
                className={`${styles.alertMenu} ${isOpenAl ? styles.active : ""} ${isScrolled ? styles.scroll : ""}`}
                ref={menuRefAl}
              >
                <div className={styles.alertList}>
                  <p className={styles.alertText}>Уведомления</p>
                  <div className={styles.alertBody}>
                    <div className={styles.authAlert}>
                      <p>
                        Войдите или зарегистрируйтесь, чтобы получать и
                        просматривать уведомления.
                      </p>
                      <Link to={LOGIN_ROUTE}>подробнее</Link>
                    </div>
                  </div>
                </div>
              </nav>
              <button
                className={styles.iconButton}
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
              >
                <img src={profile_icon} alt="Profile" />
              </button>
              {/* ВСПЛЫВАЮЩЕЕ МЕНЮ*/}
              <nav
                className={`${styles.menu} ${isOpen ? styles.active : ""} ${isScrolled ? styles.scroll : ""}`}
                ref={menuRef}
              >
                <div className={styles.menuList}>
                  <p className={styles.textAuth}>
                    Войдите или зарегистрируйтесь, чтобы использовать полный
                    функционал на маркетплейсе.
                  </p>
                  <button onClick={menuLinkToLog} className={styles.authBtn}>
                    Войти
                  </button>
                  <button onClick={menuLinkToReg} className={styles.authBtn}>
                    Зарегистрироваться
                  </button>
                </div>
              </nav>
              <NavLink to={BASKET_ROUTE}>
                <img src={basket_icon} alt="basket" />
              </NavLink>
              <NavLink to={WISHLIST_ROUTE}>
                <img src={heart_icon} alt="Wishlist" />
              </NavLink>
            </div>
          </>
        )}
      </div>
    </header>
  );
});

export default NavBar;
