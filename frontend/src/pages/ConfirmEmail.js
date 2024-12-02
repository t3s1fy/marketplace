import React from "react";
import { Link } from "react-router-dom";
import "../styles/ConfirmEmail.css";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const ConfirmEmail = () => {
  return (
    <div className="confirm-email-page">
      <div className="confirm-email-container">
        <div className="confirm-email-header">
          <p className="heading-text">Регистрация</p>
        </div>
        {/* Линия для шапки контейнера */}
        <div className="line"></div>
        <div className="confirm-email-body">
          <div className="body-text-container">
            <p className="body-text">Подтвердите ваш электронный адрес.</p>
          </div>
          <div className="input-block">
            <label htmlFor="verificationCode" className="input-label">
              Код верификации
            </label>
            <input
              type="text"
              name="verificationCode"
              id="verificationCode"
              placeholder=""
            />
            <a className="send-code-again" href="#">
              отправить новый код
            </a>
          </div>
          <button className="confirm-btn">Подтвердить</button>
          <div className="line-body"></div>
          <div className="faq-text">
            <p>
              Если у вас что-то не получается, вы можете перейти на страницу с
              <a href="#"> FAQ</a> для получения дополнительной информации по
              восстановлению доступа к аккаунту и другим вопросам.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
