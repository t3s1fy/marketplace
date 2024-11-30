import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "../components/checkbox/Checkbox";
import apple_icon from "../assets/icons/apple_icon.svg";
import google_icon from "../assets/icons/google_icon.svg";
import eye_icon from "../assets/icons/eye_icon.svg";
import "../styles/Auth.css";
import {
  FORGOT_PASSWORD_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CONFIRM_EMAIL_ROUTE,
} from "../utils/consts";

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate(); // Инициализируем хук для навигации

  const [rulesChecked, setRulesChecked] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  // Обработчик для кнопки регистрации
  const handleRegisterClick = () => {
    if (rulesChecked) {
      // Переходим на страницу подтверждения email
      navigate(CONFIRM_EMAIL_ROUTE);
    }
  };

  return (
    <div className="auth-page">
      {/* Контейнер для формы */}
      <div className="auth-container">
        {/* Строка с "Вход" и "Регистрация" */}
        <div className="auth-header">
          <div
            className={
              isLogin ? "auth-title-container active" : "auth-title-container"
            }
          >
            <div className={isLogin ? "auth-title active" : "auth-title"}>
              <Link to={LOGIN_ROUTE}>Вход</Link>
            </div>
            <div className="sub-line"></div>
            {/* Линия под "Вход" */}
          </div>
          <div
            className={
              isLogin ? "auth-title-container" : "auth-title-container active"
            }
          >
            <div className={isLogin ? "auth-title" : "auth-title active"}>
              <Link to={REGISTRATION_ROUTE}>Регистрация</Link>
            </div>
            <div className="sub-line"></div>
            {/* Линия под "Регистрация" */}
          </div>
        </div>

        {/* Линия под "Вход"/"Регистрация" */}
        <div className="line"></div>

        <div className="auth-form-wrapper">
          {isLogin ? (
            <div className="input-container-login">
              {/* Поле для ввода почты */}
              <div className="input-group-login">
                <label htmlFor="email" className="input-label">
                  Почта
                </label>
                <input type="email" id="email" placeholder="" />
              </div>

              {/* Поле для ввода пароля с ссылкой "Не помню пароль" */}
              <div className="input-group-login-2">
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
            </div>
          ) : (
            <div className="input-container-register">
              {/* Поле для ввода почты */}
              <div className="input-group-register">
                <label htmlFor="email" className="input-label">
                  Почта
                </label>
                <input type="email" id="email" placeholder="" />
              </div>
              {/* Поле для ввода пароля с ссылкой "Не помню пароль" */}
              <div className="input-group-register-2">
                <label htmlFor="password" className="input-label">
                  Пароль
                </label>
                <div className="password-wrapper-reg">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    id="password"
                    placeholder=""
                  />
                  <button
                    className="show-password-1"
                    onClick={togglePassword1Visibility}
                  >
                    <img
                      src={eye_icon}
                      alt={showPassword1 ? "Скрыть пароль" : "Показать пароль"}
                    />
                  </button>
                </div>
              </div>
              <div className="input-group-register-3">
                <label htmlFor="password" className="input-label">
                  Повторите пароль
                </label>
                <div className="password-wrapper-reg">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    id="password-confirm"
                    placeholder=""
                  />
                  <button
                    className="show-password-2"
                    onClick={togglePassword2Visibility}
                  >
                    <img
                      src={eye_icon}
                      alt={showPassword2 ? "Скрыть пароль" : "Показать пароль"}
                    />
                  </button>
                </div>
              </div>
              <form className="form">
                <Checkbox isChecked={rulesChecked} onChange={setRulesChecked}>
                  Вы согласны с <a href="#">условиями</a> политики использования
                  и кондефициальности.
                </Checkbox>
              </form>
            </div>
          )}

          {isLogin ? (
            <button className="login-btn">Войти</button>
          ) : (
            <button
              className="reg-btn"
              disabled={!rulesChecked}
              onClick={handleRegisterClick}
            >
              Регистрация
            </button>
          )}

          {/* Разделитель с "или" */}
          <div className="divider">
            <span>или</span>
          </div>

          {/* Вход через Google */}
          <div className="social-login">
            <button className="google-login">
              <img src={google_icon} alt="Google" />
              <p>
                {isLogin ? "Войти через Google" : "Регистрация через Google"}
              </p>
            </button>
          </div>

          {/* Вход через Apple */}
          <div className="social-login">
            <button className="apple-login">
              <img src={apple_icon} alt="Apple" />
              <p>{isLogin ? "Войти через Apple" : "Регистрация через Apple"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;