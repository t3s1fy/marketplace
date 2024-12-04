import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const ForgotPasswordStepTwo = () => {
  const code = useInput("", { isEmpty: true, minLength: 6 });

  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(FORGOT_PASSWORD_STEP_THREE_ROUTE);
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
              <Link className={styles.sendCodeAgain} to="#">
                отправить новый код
              </Link>
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
