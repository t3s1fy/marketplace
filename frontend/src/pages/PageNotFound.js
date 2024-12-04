import React from "react";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import "../styles/PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Переходим на главную страницу
    navigate(SHOP_ROUTE);
  };

  return (
    <div className="page-not-found">
      <div className="container">
        <div className="error-block">
          <p className="error-404">404 Not Found</p>
        </div>
        <div className="message-block">
          <p className="error-404">
            Страница не найдена. Вы можете вернуться на главную страницу.
          </p>
        </div>
        <div className="btn-block">
          <button className="btn-back" onClick={handleBackClick}>
            Вернуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
