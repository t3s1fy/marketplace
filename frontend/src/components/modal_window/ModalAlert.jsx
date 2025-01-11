import React from "react";
import styles from "./ModalAlert.module.css";
import crossMini from "./assets/crossMini.svg";
import AlertList from "../alert_elements/AlertList";

const ModalAlert = ({ alertActive, setAlertActive }) => {
  return (
    <div
      className={
        alertActive ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => setAlertActive(false)}
    >
      <div
        className={
          alertActive
            ? `${styles.modalContent} ${styles.active}`
            : `${styles.modalContent}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.crossBtn}
          onClick={() => setAlertActive(false)}
        >
          <img src={crossMini} alt="Cross" />
        </button>
        <div className={styles.main}>
          <p className={styles.title}>Уведомления</p>
          <AlertList />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
