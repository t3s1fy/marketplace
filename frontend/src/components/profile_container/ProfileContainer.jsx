import React from "react";
import styles from "./ProfileContainer.module.css";
import headerImage from "../../assets/profile_assets/headerImage.png";
import { CHANGE_PROFILE_ROUTE, HELPER_ROUTE } from "../../utils/consts";
import settingsLogo from "../../assets/profile_assets/settingsLogo.svg";
import helperLogo from "../../assets/profile_assets/helperLogo.svg";
import shazamLogo from "../../assets/profile_assets/shazamLogo.svg";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const ProfileContainer = observer(({ state, setState }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={headerImage} alt="headerImage" />
        <div className={styles.infoBlock}>
          <div className={styles.imgUser}>0_0</div>
          <span className={styles.emailUser}>vladimir.putin@mail.ru</span>
        </div>
      </div>
      <div className={styles.profileBlock}>
        <div
          onClick={() => navigate(CHANGE_PROFILE_ROUTE)}
          className={styles.profileBtn}
        >
          <img src={settingsLogo} alt="settings" />
          <p>Управление профилем</p>
        </div>
        <div
          onClick={() => navigate(HELPER_ROUTE)}
          className={styles.profileBtn}
        >
          <img src={helperLogo} alt="helper" />
          <p>Сервис и помощь</p>
        </div>
        <div onClick={() => setState(true)} className={styles.profileBtn}>
          <img src={shazamLogo} alt="shazam" />
          <p>Выйти из аккаунта</p>
        </div>
      </div>
    </div>
  );
});

export default ProfileContainer;
