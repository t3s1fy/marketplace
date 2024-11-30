import React from "react";
import { Link } from "react-router-dom";
import apple_icon from "../assets/icons/apple_icon.svg";
import "../styles/Auth.css";
import { FORGOT_PASSWORD_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
  return (
    <div className="auth-page">
      {/* Контейнер для формы */}
      <div className="auth-container">
        {/* Строка с "Вход" и "Регистрация" */}
        <div className="auth-header">
          <div className="auth-title-container active">
            <div className="auth-title active">Вход</div>
            <div className="sub-line"></div>
            {/* Линия под "Вход" */}
          </div>
          <div className="auth-title-container">
            <div className="auth-title">
              <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
            </div>
            <div className="sub-line"></div>
            {/* Линия под "Регистрация" */}
          </div>
        </div>

        {/* Линия под "Вход"/"Регистрация" */}
        <div className="line"></div>

        <div className="auth-form-wrapper">
          {/* Поле для ввода почты */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Почта
            </label>
            <input type="email" id="email" placeholder="" />
          </div>

          {/* Поле для ввода пароля с ссылкой "Не помню пароль" */}
          <div className="input-group-2">
            <label htmlFor="password" className="input-label">
              Пароль
            </label>
            <div className="password-wrapper">
              <input type="password" id="password" placeholder="" />
              <div className="forgot-password">
                <Link to={FORGOT_PASSWORD_ROUTE}>Не помню пароль</Link>
              </div>
            </div>
          </div>

          {/* Кнопка для входа */}
          <button className="login-btn">Войти</button>

          {/* Разделитель с "или" */}
          <div className="divider">
            <span>или</span>
          </div>

          {/* Вход через Google */}
          <div className="social-login">
            <button className="google-login">
              <img src={apple_icon} alt="Google" /> Войти через Google
            </button>
          </div>

          {/* Вход через Apple */}
          <div className="social-login">
            <button className="apple-login">
              <img src={apple_icon} alt="Apple" /> Войти через Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
