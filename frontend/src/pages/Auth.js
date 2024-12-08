import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "../components/checkbox/Checkbox";
import { useInput, useValidation } from "../components/validation/validation";
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

import axios from "axios";

import styles from "../components/checkbox/Checkbox.module.css";
import api from "../api/api";

const Auth = () => {
  //Для валидации
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 8, maxLength: 20 });
  const confirmPassword = useInput("", { isMatch: true }, password.value);

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  // Проверка на совпадение паролей
  useEffect(() => {
    if (password.value === confirmPassword.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password.value, confirmPassword.value]); // Следим за изменением значений паролей

  //Блок для проверки текущей ссылки
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate(); // Инициализируем хук для навигации

  //Для чекбокса
  const [rulesChecked, setRulesChecked] = useState(false);

  //функционал для скрытия пароля
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  // Обработчик для кнопки регистрации
  const handleRegisterClick = async () => {
    if (
      rulesChecked &&
      email.inputValid &&
      password.inputValid &&
      passwordsMatch
    ) {
      try {
        const userData = {
          email: email.value,
          password: password.value,
        };

        // Отправляем POST запрос на сервер Django через axios
        const response = await axios.post(
          "https://6fdc-94-140-149-103.ngrok-free.app/api/user/registration", // Замените на ваш ngrok URL для API
          userData,
          {
            headers: {
              "Content-Type": "application/json", // Отправляем данные как JSON
            },
          },
        );

        console.log("Регистрация прошла успешно:", response.data);
        // Можно перейти на страницу подтверждения email
        navigate(CONFIRM_EMAIL_ROUTE, { state: { email: email.value } });
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        alert("Ошибка при регистрации. Попробуйте позже.");
      }
    } else {
      alert("Пожалуйста, убедитесь, что все поля заполнены корректно.");
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
                <input
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  value={email.value}
                  type="email"
                  id="email"
                  placeholder=""
                />
              </div>
              {email.isDirty && email.isEmpty && (
                <p className="valid-error">Поле не может быть пустым</p>
              )}
              {email.isDirty && email.minLengthError && (
                <p className="valid-error">Некорректная длина</p>
              )}
              {email.isDirty && email.emailError && (
                <p className="valid-error">Некорректный email</p>
              )}
              {/* Поле для ввода пароля с ссылкой "Не помню пароль" */}
              <div className="input-group-login-2">
                <label htmlFor="password" className="input-label">
                  Пароль
                </label>
                <div className="password-wrapper">
                  <input
                    onChange={(e) => password.onChange(e)}
                    onBlur={(e) => password.onBlur(e)}
                    value={password.value}
                    type="password"
                    id="password"
                    placeholder=""
                  />
                  <div className="forgot-password">
                    <Link to={FORGOT_PASSWORD_ROUTE}>Не помню пароль</Link>
                    <div>
                      {password.isDirty && password.isEmpty && (
                        <p className="valid-error">Поле не может быть пустым</p>
                      )}
                      {password.isDirty && password.minLengthError && (
                        <p className="valid-error">Некорректная длина</p>
                      )}
                      {password.isDirty && password.maxLengthError && (
                        <p className="valid-error">Слишком длинный пароль</p>
                      )}
                    </div>
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
                <input
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  value={email.value}
                  type="email"
                  id="email"
                  placeholder=""
                />
              </div>
              {email.isDirty && email.isEmpty && (
                <p className="valid-error">Поле не может быть пустым</p>
              )}
              {email.isDirty && email.minLengthError && (
                <p className="valid-error">Некорректная длина</p>
              )}
              {email.isDirty && email.emailError && (
                <p className="valid-error">Некорректный email</p>
              )}
              {/* Поле для ввода пароля с ссылкой "Не помню пароль" */}
              <div className="input-group-register-2">
                <label htmlFor="password" className="input-label">
                  Пароль
                </label>
                <div className="password-wrapper-reg">
                  <input
                    onChange={(e) => password.onChange(e)}
                    onBlur={(e) => password.onBlur(e)}
                    value={password.value}
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
              {password.isDirty && password.isEmpty && (
                <p className="valid-error">Поле не может быть пустым</p>
              )}
              {password.isDirty && password.minLengthError && (
                <p className="valid-error">Некорректная длина</p>
              )}
              {password.isDirty && password.maxLengthError && (
                <p className="valid-error">Слишком длинный пароль</p>
              )}
              <div className="input-group-register-3">
                <label htmlFor="password-confirm" className="input-label">
                  Повторите пароль
                </label>
                <div className="password-wrapper-reg">
                  <input
                    onChange={(e) => confirmPassword.onChange(e)}
                    onBlur={(e) => confirmPassword.onBlur(e)}
                    value={confirmPassword.value}
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
              {confirmPassword.matchError && (
                <p className="valid-error">Пароли не совпадают</p>
              )}
              <form className="form">
                <Checkbox isChecked={rulesChecked} onChange={setRulesChecked}>
                  Вы согласны с{" "}
                  <Link className={styles.linkRules} to="#">
                    условиями
                  </Link>{" "}
                  политики использования и кондефициальности.
                </Checkbox>
              </form>
            </div>
          )}

          {isLogin ? (
            <button
              disabled={!email.inputValid || !password.inputValid}
              className="login-btn"
            >
              Войти
            </button>
          ) : (
            <button
              className="reg-btn"
              disabled={
                !rulesChecked ||
                !email.inputValid ||
                !password.inputValid ||
                !passwordsMatch
              }
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
