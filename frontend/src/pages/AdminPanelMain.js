import React, { useContext } from "react";
import style from "../styles/AdminPanelMain.module.css";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import s from "../styles/AdminPanelMain.module.css";
import MiniNavBar from "../components/MiniNavBar";
import SideBar from "../components/SideBar";
import headerImage from "../assets/admin_panel_main_assets/headerImage.png";
import orderOne from "../assets/admin_panel_main_assets/order_one.png";
import orderTwo from "../assets/admin_panel_main_assets/order_two.png";
import orderThree from "../assets/admin_panel_main_assets/order_three.png";

const AdminPanelMain = () => {
  return (
    <div className={s.adminMainPage}>
      <MiniNavBar />
      <SideBar />
      <div className={s.page}>
        <div className={s.container}>
          <div className={s.headerBlock}>
            <img src={headerImage} alt="" />
            <div className={s.headerTitle}>
              <p>
                Добро пожаловать, <span>vladimir.putin@mail.ru!</span>
              </p>
            </div>
          </div>
          <div className={s.main}>
            <div className={s.btnBlock}>
              <button className={`${s.btn} ${s.active}`}>
                <img src={orderOne} alt="" />
                <p>Заказы</p>
              </button>
              <button className={s.btn}>
                <img src={orderTwo} alt="" />
                <p>Доход</p>
              </button>
              <button className={s.btn}>
                <img src={orderThree} alt="" />
                <p>Выплаты</p>
              </button>
            </div>
            <div className={s.infoBLock}>
              <div className={s.infoElemLeft}></div>
              <div className={s.infoElemRight}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelMain;
