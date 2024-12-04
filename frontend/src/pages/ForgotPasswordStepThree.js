import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/ForgotPasswordStepThree.module.css";
import eye_icon from "../assets/icons/eye_icon.svg";

import { useInput } from "../components/validation/validation";
import { values } from "mobx";
import { FAQ_ROUTE, SHOP_ROUTE } from "../utils/consts";

const ForgotPasswordStepThree = () => {
  const password = useInput("", { isEmpty: true, minLength: 8, maxLength: 20 });
  const confirmPassword = useInput("", { isMatch: true }, password.value);

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    if (password.value === confirmPassword.value) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password.value, confirmPassword.value]);

  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword1Visibility = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2(!showPassword2);
  };

  const handleGoHomeClick = () => {
    navigate(SHOP_ROUTE);
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
            <p>
              Введите новый пароль. Вы будете использовать его при входе в
              аккаунт.
            </p>
          </div>
          <div className={styles.inputBlockForm}>
            <div className={styles.inputBlock}>
              <label htmlFor="password" className={styles.labelText}>
                Пароль
              </label>
              <div className={styles.passwordInput}>
                <input
                  className={styles.inputPassword}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  value={password.value}
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  placeholder=""
                />
                <button
                  className={styles.showPasswordOne}
                  onClick={togglePassword1Visibility}
                >
                  <img
                    src={eye_icon}
                    alt={showPassword1 ? "Скрыть пароль" : "Показать пароль"}
                  />
                </button>
              </div>
              <div className={styles.validBlock}>
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
            <div className={styles.inputBlock}>
              <label htmlFor="confirmPassword" className={styles.labelTextTwo}>
                Повторите пароль
              </label>
              <div className={styles.passwordInput}>
                <input
                  className={styles.inputPasswordTwo}
                  onChange={(e) => confirmPassword.onChange(e)}
                  onBlur={(e) => confirmPassword.onBlur(e)}
                  value={confirmPassword.value}
                  type={showPassword2 ? "text" : "password"}
                  id="confirmPassword"
                  placeholder=""
                />
                <button
                  className={styles.showPasswordTwo}
                  onClick={togglePassword2Visibility}
                >
                  <img
                    src={eye_icon}
                    alt={showPassword2 ? "Скрыть пароль" : "Показать пароль"}
                  />
                </button>
              </div>
              <div className={styles.validBlock}>
                {confirmPassword.matchError && (
                  <p className="valid-error">Пароли не совпадают</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleGoHomeClick}
            className={styles.confirmBtn}
            disabled={!password.inputValid || !passwordsMatch}
          >
            Сбросить пароль
          </button>
          <div className={styles.lineBody}></div>
          <div className={styles.faqText}>
            <p>
              После нажатия на кнопку ваш старый пароль станет недействительным.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordStepThree;
