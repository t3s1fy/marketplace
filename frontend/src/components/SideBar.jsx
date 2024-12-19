import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/SideBar.module.css";
import { Context } from "../index";
import { UseClickOutside } from "./hooks/useClickOutside";
import { Link } from "react-router-dom";
import users from "../assets/sidebar_assets/all_users_icon.svg";
import blocks from "../assets/sidebar_assets/blocks_icon.svg";
import buyers from "../assets/sidebar_assets/buyers_icon.svg";
import categories from "../assets/sidebar_assets/categories_icon.svg";
import exit from "../assets/sidebar_assets/exit_icon.svg";
import orders from "../assets/sidebar_assets/orders_icon.svg";
import other from "../assets/sidebar_assets/other_icon.svg";
import products from "../assets/sidebar_assets/products_icon.svg";
import sellers from "../assets/sidebar_assets/sellers_icon.svg";
import { CaretDown, CaretLeft, House } from "phosphor-react";

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setIsActive((prev) => !prev); // Переключаем состояние активности
  };

  const handleMenuClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prevSubmenus) => {
      // Если подменю открыто, закрыть его
      if (prevSubmenus.includes(index)) {
        return prevSubmenus.filter((i) => i !== index);
      }
      // Если подменю не открыто, закрыть все и открыть текущее
      return [index];
    });
  };

  // Закрытие всех подменю при клике вне
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenSubmenus([]); // Закрывает все подменю, если кликнули вне меню
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.sidebar} ${isActive ? styles.active : ""}`}>
      <div className={styles.menuBtn} onClick={handleMenuToggle}>
        <CaretLeft className={styles.i}></CaretLeft>
      </div>
      <div className={styles.head}>
        {isActive ? (
          <House className={styles.mainLogo}></House>
        ) : (
          <p>Главная</p>
        )}
      </div>
      <div className={styles.nav}>
        <div className={styles.menu}>
          <p className={styles.title}>СИСТЕМА</p>
          <ul>
            <li
              className={activeIndex === 0 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(0);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={blocks} alt="blocks" />
                <span className={styles.text}>Блоки</span>
              </Link>
            </li>
          </ul>
          <p className={styles.title}>ЭЛЕМЕНТЫ</p>
          <ul>
            <li
              className={activeIndex === 1 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(1);
                toggleSubmenu(1);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={categories} alt="blocks" />
                <span className={styles.text}>Категории</span>
                <CaretDown className={styles.arrow} color="black" />
              </Link>
              <ul
                className={`${styles.subMenu} ${
                  openSubmenus.includes(1) ? styles.open : styles.close
                }`}
              >
                <li
                  className={activeIndex === 2 ? styles.active : ""}
                  onClick={() => {
                    handleMenuClick(2);
                  }}
                >
                  <Link to="#">
                    <span className={styles.text}>Категории</span>
                  </Link>
                </li>
                <li
                  className={activeIndex === 3 ? styles.active : ""}
                  onClick={() => {
                    handleMenuClick(3);
                  }}
                >
                  <Link to="#">
                    <span className={styles.text}>Подкатегории</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={activeIndex === 4 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(4);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={products} alt="blocks" />
                <span className={styles.text}>Продукты</span>
              </Link>
            </li>
            <li
              className={activeIndex === 5 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(5);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={orders} alt="blocks" />
                <span className={styles.text}>Заказы</span>
              </Link>
            </li>
          </ul>
          <p className={styles.title}>ТОРГОВЛЯ</p>
          <ul>
            <li
              className={activeIndex === 6 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(6);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={users} alt="blocks" />
                <span className={styles.text}>Все пользователи</span>
              </Link>
            </li>
            <li
              className={activeIndex === 7 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(7);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={buyers} alt="blocks" />
                <span className={styles.text}>Покупатели</span>
              </Link>
            </li>
            <li
              className={activeIndex === 8 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(8);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={sellers} alt="blocks" />
                <span className={styles.text}>Продавцы</span>
              </Link>
            </li>
            <li
              className={activeIndex === 9 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(9);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={products} alt="blocks" />
                <span className={styles.text}>Магазины</span>
              </Link>
            </li>
            <li
              className={activeIndex === 10 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(10);
                toggleSubmenu(10);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={other} alt="blocks" />
                <span className={styles.text}>Другое</span>
                <CaretDown className={styles.arrow} color="black" />
              </Link>
              <ul
                className={`${styles.subMenu} ${
                  openSubmenus.includes(10) ? styles.open : styles.close
                }`}
              >
                <li
                  className={activeIndex === 11 ? styles.active : ""}
                  onClick={() => handleMenuClick(11)}
                >
                  <Link to="#">
                    <span className={styles.text}>Доход</span>
                  </Link>
                </li>
                <li
                  className={activeIndex === 12 ? styles.active : ""}
                  onClick={() => handleMenuClick(12)}
                >
                  <Link to="#">
                    <span className={styles.text}>Выплаты</span>
                  </Link>
                </li>
                <li
                  className={activeIndex === 13 ? styles.active : ""}
                  onClick={() => handleMenuClick(13)}
                >
                  <Link to="#">
                    <span className={styles.text}>Отзывы</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={activeIndex === 14 ? styles.active : ""}
              onClick={() => {
                handleMenuClick(14);
                setOpenSubmenus([]);
              }}
            >
              <Link to="#">
                <img className={styles.icon} src={exit} alt="blocks" />
                <span className={styles.text}>Выйти из аккаунта</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
