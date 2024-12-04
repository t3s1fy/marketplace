import React from "react";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Переходим на главную страницу
    navigate(SHOP_ROUTE);
  };

  return (
    <div className={styles.pageNotFound}>
      <div className={styles.container}>
        <div className={styles.errorBlock}>
          <p>404 Not Found</p>
        </div>
        <div className={styles.messageBlock}>
          <p>Страница не найдена. Вы можете вернуться на главную страницу.</p>
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.btnBack} onClick={handleBackClick}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
