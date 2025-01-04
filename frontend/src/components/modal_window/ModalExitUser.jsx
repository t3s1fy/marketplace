import React, { useContext } from "react";
import styles from "./ModalExitUser.module.css";
import cross from "./assets/cross.svg";
import { Context } from "../../index";
import { LOGIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const ModalExitUser = ({ active, setActive, title, subtitle, confirm }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modalContent} ${styles.active}`
            : `${styles.modalContent}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.main}>
          <button className={styles.crossBtn} onClick={() => setActive(false)}>
            <img src={cross} alt="Cross" />
          </button>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.btnContainer}>
            <button
              className={styles.exit}
              onClick={() => {
                user.setIsAuth(false);
                setActive(false);
                navigate(LOGIN_ROUTE);
              }}
            >
              {confirm}
            </button>
            <button className={styles.state} onClick={() => setActive(false)}>
              Нет, подождите!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExitUser;
