import React, { useContext } from "react";
import style from "../styles/Profile.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pictureOne from "../assets/profile_assets/picture_one.png";
import pictureTwo from "../assets/profile_assets/picture_two.png";
import helperLogo from "../assets/profile_assets/helperLogo.svg";
import cardLogo from "../assets/profile_assets/cardLogo.svg";
import settingsLogo from "../assets/profile_assets/settingsLogo.svg";
import shazamLogo from "../assets/profile_assets/shazamLogo.svg";
import heartIcon from "../assets/profile_assets/heartIcon.svg";
import alertIcon from "../assets/profile_assets/alertIcon.svg";
import basketIcon from "../assets/profile_assets/busketIcon.svg";
import feedbackIcon from "../assets/profile_assets/feedbackIcon.svg";
import packageIcon from "../assets/profile_assets/packageIcon.svg";
import starIcon from "../assets/profile_assets/startIcon.svg";
import liner from "../assets/profile_assets/beatifulLine.png";
import { Context } from "../index";
import { BASKET_ROUTE, SETTINGS_ROUTE, WISHLIST_ROUTE } from "../utils/consts";

const Profile = () => {
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
            <div className={style.imgUser}>ZV</div>
            <span className={style.emailUser}>vladimir.putin@mail.ru</span>
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
        <div className={style.btnBlock}>
          <div
            onClick={() => navigate(WISHLIST_ROUTE)}
            className={style.btnElem}
          >
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Избранное</p>
              <p className={style.btnSubtitle}>n товаров</p>
            </div>
            <img src={heartIcon} alt="heart" />
          </div>
          <div onClick={() => navigate(null)} className={style.btnElem}>
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Мои покупки</p>
              <p className={style.btnSubtitle}>смотреть</p>
            </div>
            <img src={packageIcon} alt="package" />
          </div>
          <div onClick={() => navigate(null)} className={style.btnElem}>
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Уведомления</p>
              <p className={style.btnSubtitle}>смотреть</p>
            </div>
            <img src={alertIcon} alt="alert" />
          </div>
        </div>
        <div className={style.btnBlock}>
          <div onClick={() => navigate(BASKET_ROUTE)} className={style.btnElem}>
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Моя корзина</p>
              <p className={style.btnSubtitle}>n товаров</p>
            </div>
            <img src={basketIcon} alt="basket" />
          </div>
          <div onClick={() => navigate(null)} className={style.btnElem}>
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Доставки</p>
              <p className={style.btnSubtitle}>смотреть</p>
            </div>
            <img src={starIcon} alt="star" />
          </div>
          <div onClick={() => navigate(null)} className={style.btnElem}>
            <div className={style.btnTextBlock}>
              <p className={style.btnTitle}>Мои отзывы</p>
              <p className={style.btnSubtitle}>n товаров ждут оценки</p>
            </div>
            <img src={feedbackIcon} alt="feedback" />
          </div>
        </div>
      </div>
      <div className={style.regContainer}>
        <img className={style.pictureOne} src={pictureOne} alt="picture" />
        <div className={style.textContainer}>
          <p className={style.retTitle}>Хотите стать продавцом?</p>
          <p className={style.retSubTitle}>
            Зарегистрируйтесь в кабинете продавца!
          </p>
        </div>
        <img className={style.pictureTwo} src={pictureTwo} alt="picture" />
      </div>
      <button className={style.regBtn}>Зарегистрироваться</button>
      <img className={style.linerBeaty} src={liner} alt="liner" />
      <div className={style.productView}>
        <p>Вы смотрели</p>
        <div className={style.productContainer}></div>
      </div>
    </div>
  );
};

export default Profile;
