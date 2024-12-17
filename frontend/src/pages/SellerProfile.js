import React, { useContext } from "react";
import style from "../styles/SellerProfile.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cardLogo from "../assets/profile_assets/cardLogo.svg";
import { SETTINGS_ROUTE } from "../utils/consts";
import settingsLogo from "../assets/profile_assets/settingsLogo.svg";
import helperLogo from "../assets/profile_assets/helperLogo.svg";
import shazamLogo from "../assets/profile_assets/shazamLogo.svg";
import { Context } from "../index";
import pictureOne from "../assets/seller_profile_assets/pictureThree.png";

const SellerProfile = () => {
  const location = useLocation();
  const { user } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className={style.profilePage}>
      <div className={style.mainContainer}>
        <div className={style.profileBlock}>
          <Link className={style.editProfileText} to="">
            Изменить профиль
          </Link>
          <div className={style.infoBlock}>
            <div className={style.imgUser}>0_0</div>
            <span className={style.emailUser}>pupkin@gmail.com</span>
          </div>
          <hr className={style.line}></hr>
          <p className={style.welcomeText}>
            Добро пожаловать в личный кабинет!
          </p>
          <div className={style.profileBtnBlock}>
            <div onClick={() => navigate(null)} className={style.profileBtn}>
              <img src={cardLogo} alt="card" />
              <p>Способы оплаты</p>
            </div>
            <div
              onClick={() => navigate(SETTINGS_ROUTE)}
              className={style.profileBtn}
            >
              <img src={settingsLogo} alt="settings" />
              <p>Настройки</p>
            </div>
            <div onClick={() => navigate(null)} className={style.profileBtn}>
              <img src={helperLogo} alt="helper" />
              <p>Сервис и помощь</p>
            </div>
            <div onClick={() => navigate(null)} className={style.profileBtn}>
              <img src={shazamLogo} alt="shazam" />
              <p>Выйти из аккаунта</p>
            </div>
          </div>
        </div>
        <div className={style.fillProfileBlock}>
          <div className={style.fillProfileElem}>
            <img
              className={style.pictureOne}
              src={pictureOne}
              alt="beatiful picture"
            />
            <div className={style.textBlock}>
              <p className={style.titleTextBlock}>Заполните профиль</p>
              <p className={style.subtitleTextBlock}>
                Осталось совсем немного!
              </p>
            </div>
            <hr className={style.lineInFillProfileElem}></hr>
            <div className={style.stepBlock}>
              <p className={style.titleStepBlock}>ШАГ</p>
              <p className={style.subtitleStepBlock}>1/4</p>
            </div>
          </div>
          <div className={style.fillProfileElem}></div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
