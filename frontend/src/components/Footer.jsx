import React, { useContext } from "react";
import styles from "../styles/Footer.module.css";
import { Context } from "../index";

import instagram_icon from "../assets/icons/instagram-icon.svg";
import telegram_icon from "../assets/icons/telegram_icon.svg";
import facebook_icon from "../assets/icons/facebook_icon.svg";
import twitter_icon from "../assets/icons/twitter_icon.svg";
import dribble_icon from "../assets/icons/dribbble_icon.svg";
import linkedin_icon from "../assets/icons/linkedin_icon.svg";
import logo from "../assets/icons/marketpalceLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  CONFIRM_EMAIL_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  FORGOT_PASSWORD_STEP_THREE_ROUTE,
  FORGOT_PASSWORD_STEP_TWO_ROUTE,
  LOGIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  REGISTRATION_ROUTE,
  SELLER_AUTH_ONE_ROUTE,
  SELLER_AUTH_THREE_ROUTE,
  SELLER_AUTH_TWO_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";

const Footer = () => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  // Список исключённых маршрутов
  const excludedRoutes = [
    SELLER_AUTH_TWO_ROUTE,
    SELLER_AUTH_ONE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    PAGE_NOT_FOUND_ROUTE,
    FORGOT_PASSWORD_STEP_TWO_ROUTE,
    FORGOT_PASSWORD_STEP_THREE_ROUTE,
    CONFIRM_EMAIL_ROUTE,
  ];

  // Проверяем, находится ли текущий маршрут в списке исключений
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {!isExcludedRoute && (
          <div className={styles.dynamicIcon}>
            <img
              onClick={() => navigate(SHOP_ROUTE)}
              src={logo}
              alt="Site icon"
            />
          </div>
        )}
        <div className={styles.footerIcons}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram_icon} alt="instagram icon" />
          </a>

          <a
            href="https://web.telegram.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={telegram_icon} alt="telegram icon" />
          </a>

          <a
            href="https://facebook.com.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook_icon} alt="facebook icon" />
          </a>

          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src={twitter_icon} alt="twitter icon" />
          </a>

          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dribble_icon} alt="dribbble icon" />
          </a>

          <a
            href="https://avatars.mds.yandex.net/i?id=145bdc4bca8b598d5a1137cf98308af6_l-10577947-images-thumbs&n=13"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedin_icon} alt="linkedin icon" />
          </a>
        </div>
        <div className={styles.footerLinks}>
          <Link to="#" className={styles.footerLink}>
            Item first
          </Link>
          <Link to="#" className={styles.footerLink}>
            Item two
          </Link>
          <Link to="#" className={styles.footerLink}>
            Item three
          </Link>
          <Link to="#" className={styles.footerLink}>
            Item four
          </Link>
          <Link to="#" className={styles.footerLink}>
            Item five
          </Link>
          <Link to="#" className={styles.footerLink}>
            Item six
          </Link>
        </div>
        {/* Линия */}
        <hr className={styles.footerLine} />
        <p className={styles.footerText}>© 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
