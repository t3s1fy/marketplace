import React, { useContext } from "react";
import styles from "./ModalExitUser.module.css";
import cross from "./assets/cross.svg";
import { Context } from "../../index";
import {
  CHANGE_PROFILE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from "../../utils/consts";
import { useNavigate } from "react-router-dom";

const ModalExitUser = ({
  active,
  setActive,
  second,
  title,
  subtitle,
  confirm,
  action,
  onConfirm,
}) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const checkAction = (action) => {
    if (action === "deleteAvatar") {
      return () => {
        onConfirm();
        setActive(false);
      };
    } else if (action === "exit") {
      return () => {
        user.setIsAuth(false);
        setActive(false);
        navigate(LOGIN_ROUTE);
      };
    } else if (action === "change-password") {
      return () => {
        setActive(false);
      };
    }
  };

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
          {!second ? (
            <>
              <p className={styles.title}>{title}</p>
              <p className={styles.subtitle}>{subtitle}</p>
              <div className={styles.btnContainer}>
                <button className={styles.exit} onClick={checkAction(action)}>
                  {confirm}
                </button>
                <button
                  className={styles.state}
                  onClick={() => setActive(false)}
                >
                  Нет, подождите!
                </button>
              </div>
            </>
          ) : (
            <>
              <p className={`${styles.title} ${styles.top}`}>{title}</p>
              <input type="code" className={styles.inputBlock} />
              <button className={`${styles.exit} ${styles.bottom}`}>
                Подвтердить
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalExitUser;
