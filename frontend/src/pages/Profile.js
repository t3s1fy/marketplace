import React, { useContext, useState } from "react";
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
import headerImage from "../assets/profile_assets/headerImage.png";
import headerImageSmall from "../assets/profile_assets/headerImageSmall.png";
import { Context } from "../index";
import {
  BASKET_ROUTE,
  CHANGE_PROFILE_ROUTE,
  FEEDBACK_ROUTE,
  HELPER_ROUTE,
  LOGIN_ROUTE,
  SELLER_PROFILE_ROUTE,
  SETTINGS_ROUTE,
  WISHLIST_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import ProductList from "../components/device/ProductList";
import ModalExitUser from "../components/modal_window/ModalExitUser";
import styles from "../components/modal_window/ModalExitUser.module.css";
import ProfileContainer from "../components/profile_container/ProfileContainer";

const Profile = observer(() => {
  const location = useLocation();
  const { user } = useContext(Context);
  const { item } = useContext(Context);
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);

  const getCorrectForm = (length) => {
    if (length % 10 === 1 && length % 100 !== 11) {
      return "товар";
    } else if (
      length % 10 >= 2 &&
      length % 10 <= 4 &&
      (length % 100 < 10 || length % 100 >= 20)
    ) {
      return "товара";
    } else {
      return "товаров";
    }
  };

  return (
    <div className={style.profilePage}>
      <div className={style.mainContainer}>
        <ProfileContainer state={modalActive} setState={setModalActive} />
        <div className={style.btnBlock}>
          <div
            onClick={() => navigate(WISHLIST_ROUTE)}
            className={style.btnElem}
          >
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Избранное</p>
                <p
                  className={style.btnSubtitle}
                >{`${item.favorites.length} ${getCorrectForm(item.favorites.length)}`}</p>
              </div>
              <img src={heartIcon} alt="heart" />
            </div>
          </div>

          <div onClick={() => navigate(BASKET_ROUTE)} className={style.btnElem}>
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Моя корзина</p>
                <p
                  className={style.btnSubtitle}
                >{`${item.basket.length} ${getCorrectForm(item.basket.length)}`}</p>
              </div>
              <img src={basketIcon} alt="basket" />
            </div>
          </div>

          <div onClick={() => navigate(null)} className={style.btnElem}>
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Мои покупки</p>
                <p className={style.btnSubtitle}>смотреть</p>
              </div>
              <img src={packageIcon} alt="package" />
            </div>
          </div>

          <div
            onClick={() => navigate(FEEDBACK_ROUTE)}
            className={style.btnElem}
          >
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Мои отзывы</p>
                <p className={style.btnSubtitle}>n товаров ждут оценки</p>
              </div>
              <img src={feedbackIcon} alt="feedback" />
            </div>
          </div>

          <div onClick={() => navigate(null)} className={style.btnElem}>
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Доставки</p>
                <p className={style.btnSubtitle}>смотреть</p>
              </div>
              <img src={starIcon} alt="star" />
            </div>
          </div>

          <div onClick={() => navigate(null)} className={style.btnElem}>
            <img src={headerImageSmall} alt="header" />
            <div className={style.btnMainBlock}>
              <div className={style.btnTextBlock}>
                <p className={style.btnTitle}>Уведомления</p>
                <p className={style.btnSubtitle}>смотреть</p>
              </div>
              <img src={alertIcon} alt="alert" />
            </div>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.regContainer}>
          <img className={style.pictureOne} src={pictureOne} alt="picture" />
          <div className={style.textContainer}>
            {user.isSeller ? (
              <>
                <p className={style.retTitle}>Вы стали продавцом!</p>
                <p className={style.retSubTitle}>
                  Хотите проверить статистику?
                </p>
              </>
            ) : (
              <>
                <p className={style.retTitle}>Хотите стать продавцом?</p>
                <p className={style.retSubTitle}>
                  Зарегистрируйтесь в кабинете продавца!
                </p>
              </>
            )}
          </div>
          <img className={style.pictureTwo} src={pictureTwo} alt="picture" />
        </div>
        {user.isSeller ? (
          <button
            onClick={() => navigate(SELLER_PROFILE_ROUTE)}
            className={style.regBtn}
          >
            Войти в кабинет
          </button>
        ) : (
          <button className={style.regBtn}>Зарегистрироваться</button>
        )}
        <img className={style.linerBeaty} src={liner} alt="liner" />
      </div>

      <div className={style.productView}>
        <p>Вы смотрели</p>
        <div>
          <ProductList
            isBigger={false}
            showDiscountsOnly={false}
            maxItems={6}
          />
        </div>
      </div>
      <ModalExitUser
        active={modalActive}
        setActive={setModalActive}
        title={"Вы точно хотите выйти\n" + "из аккаунта?"}
        subtitle={
          "после выхода из аккаунта вам придётся\n" +
          "заново вводить логин (почту) и пароль"
        }
        confirm={"Да, выйти"}
        action={"exit"}
      ></ModalExitUser>
    </div>
  );
});

export default Profile;
