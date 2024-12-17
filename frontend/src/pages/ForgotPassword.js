import React, { useContext, useState } from "react";
import { useInput } from "../components/validation/validation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/ForgotPassword.module.css";
import {
  CONFIRM_EMAIL_ROUTE,
  FAQ_ROUTE,
  FORGOT_PASSWORD_STEP_TWO_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { Context } from "../index";
import { login, passwordReset, registration } from "../api/api";

const ForgotPassword = () => {
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });

  const { user } = useContext(Context);
  const { state } = useLocation(); // Получаем состояние, переданное через navigate
  const navigate = useNavigate();

  const [error, setError] = useState(""); // Состояние для ошибок

  const handleNextClick = async () => {
    try {
      let data;
      data = await passwordReset(email.value);
      if (data.status === 200) {
        navigate(FORGOT_PASSWORD_STEP_TWO_ROUTE, {
          state: { email: email.value },
        });
      } else {
        alert("Неверный email адрес.");
      }
    } catch (error) {
      setError("Ошибка при отправки кода подтверждения. Попробуйте еще раз.");
    }
  };

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.forgotPasswordForm}>
        <div className={styles.forgotPasswordHeader}>
          <p>Восстановление пароля</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.forgotPasswordBody}>
          <div className={styles.bodyTextContainer}>
            <p>Введите почту, которая была связана с вашим аккаунтом.</p>
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="verificationCode" className="input-label">
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
            <div className={styles.validationBlock}>
              {email.isDirty && email.isEmpty && (
                <p className={styles.validationError}>
                  Поле не может быть пустым
                </p>
              )}
              {email.isDirty && email.minLengthError && (
                <p className={styles.validationError}>Некорректная длина</p>
              )}
              {email.isDirty && email.emailError && (
                <p className={styles.validationError}>Некорректный email</p>
              )}
            </div>
          </div>
          <button
            onClick={handleNextClick}
            className={styles.confirmBtn}
            disabled={!email.inputValid}
          >
            Отправить код
          </button>
          <div className={styles.linkContainer}>
            <p className={styles.linkContainerInfo}>
              {" "}
              Уже есть аккаунт?
              <Link className={styles.linkTeg} to={LOGIN_ROUTE}>
                {" "}
                Войти
              </Link>
            </p>
            <p className={styles.linkContainerInfo}>
              {" "}
              Нет аккаунта?
              <Link className={styles.linkTeg} to={REGISTRATION_ROUTE}>
                {" "}
                Зарегистрироваться
              </Link>
            </p>
          </div>
          <div className={styles.lineBody}></div>
          <div className={styles.faqText}>
            <p>
              Если у вас что-то не получается, вы можете перейти на страницу с
              <Link className={styles.faqTextLink} to={FAQ_ROUTE}>
                {" "}
                FAQ
              </Link>{" "}
              для получения дополнительной информации по восстановлению доступа
              к аккаунту и другим вопросам.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
