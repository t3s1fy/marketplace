import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/ForgotPasswordStepTwo.module.css";
import {
  FAQ_ROUTE,
  FORGOT_PASSWORD_STEP_THREE_ROUTE,
  FORGOT_PASSWORD_STEP_TWO_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts";
import { useInput } from "../components/validation/validation";
import { values } from "mobx";
import { Context } from "../index";
import { resendConfirmationCode, verifyCode } from "../api/api";

const ForgotPasswordStepTwo = () => {
  const code = useInput("", { isEmpty: true, minLength: 6 });

  const { user } = useContext(Context);
  const { state } = useLocation(); // Получаем состояние, переданное через navigate
  const email = state?.email; // Извлекаем email из состояния
  console.log(state?.email);
  const [error, setError] = useState(""); // Состояние для ошибок

  const navigate = useNavigate();

  const sendConfirmationCode = async () => {
    try {
      let data;
      const action_type = "reset_password";
      data = await resendConfirmationCode(email, action_type);
      if (data.status === 200) {
        console.log("Код отправлен");
      } else {
        alert("Не удалось отправить код.");
      }
    } catch (error) {
      setError("Ошибка при отправки кода подтверждения. Попробуйте еще раз.");
    }
  };

  const handleNextClick = async () => {
    try {
      let data;
      data = await verifyCode(email, code.value);
      if (data.status === 200) {
        navigate(FORGOT_PASSWORD_STEP_THREE_ROUTE, {
          state: { email: email },
        });
      } else {
        alert("Неверный email адрес.");
      }
    } catch (error) {
      setError("Ошибка при отправки кода подтверждения. Попробуйте еще раз.");
    }
  };

  return (
    <div className={styles.confirmEmailPage}>
      <div className={styles.confirmEmailContainer}>
        <div className={styles.confirmEmailHeader}>
          <p>Восстановление пароля</p>
        </div>
        {/* Линия для шапки контейнера */}
        <div className={styles.line}></div>
        <div className={styles.confirmEmailBody}>
          <div className={styles.bodyTextContainer}>
            <p>Подтвердите ваш электронный адрес.</p>
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="verificationCode" className="input-label">
              Код верификации
            </label>
            <input
              onChange={(e) => code.onChange(e)}
              onBlur={(e) => code.onBlur(e)}
              value={code.value}
              type="text"
              name="verificationCode"
              id="verificationCode"
              placeholder=""
            />
            <div className={styles.validBlock}>
              <span
                className={styles.sendCodeAgain}
                onClick={sendConfirmationCode}
              >
                отправить новый код
              </span>
              <div>
                {code.isDirty && code.isEmpty && (
                  <p className={styles.validError}>Поле не может быть пустым</p>
                )}
                {code.isDirty && code.minLengthError && (
                  <p className={styles.validError}>Некорректная длина</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleNextClick}
            className={styles.confirmBtn}
            disabled={!code.inputValid}
          >
            Подтвердить
          </button>
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

export default ForgotPasswordStepTwo;
