import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/ConfirmEmail.module.css";
import {
  FAQ_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { useInput } from "../components/validation/validation";
import { values } from "mobx";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const ConfirmEmail = observer(() => {
  const { user } = useContext(Context);
  const { state } = useLocation(); // Получаем состояние, переданное через navigate
  const email = state?.email; // Извлекаем email из состояния
  const code = useInput("", { isEmpty: true, minLength: 6 });

  const [loading, setLoading] = useState(false); // Состояние загрузки для кнопки
  const [error, setError] = useState(""); // Состояние для ошибок

  const navigate = useNavigate(); // Хук для навигации после успешного подтверждения

  const handleSubmit = async () => {
    if (code.inputValid) {
      setLoading(true);
      setError(""); // Очищаем ошибки перед отправкой запроса

      try {
        const response = await axios.post(
          "https://6fdc-94-140-149-103.ngrok-free.app/api/user/registration-confirm", // URL на сервер
          { email: email, confirmation_code: code.value }, // Отправляем код из инпута
          {
            headers: {
              "Content-Type": "application/json", // Указываем тип данных
            },
          },
        );

        if (response.status === 200) {
          // Если код подтверждения верен, перенаправляем пользователя на страницу входа
          navigate(SHOP_ROUTE);
          user.setUser(user);
          user.setIsAuth(true);
        }
      } catch (err) {
        setError("Ошибка при подтверждении кода. Попробуйте еще раз.");
      } finally {
        setLoading(false); // Останавливаем индикатор загрузки
      }
    }
  };
  return (
    <div className={styles.confirmEmailPage}>
      <div className={styles.confirmEmailContainer}>
        <div className={styles.confirmEmailHeader}>
          <p>Регистрация</p>
        </div>
        {/* Линия для шапки контейнера */}
        <div className={styles.line}></div>
        <div className={styles.confirmEmailBody}>
          <div className={styles.bodyTextContainer}>
            <p>Подтвердите ваш электронный адрес.</p>
          </div>
          <div className={styles.inputBlock}>
            <label htmlFor="verificationCode">Код верификации</label>
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
              <a className={styles.sendCodeAgain} href="#">
                отправить новый код
              </a>
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
            onClick={handleSubmit}
            className={styles.confirmBtn}
            disabled={!code.inputValid}
          >
            Подтвердить
          </button>
          <div className={styles.lineBody}></div>
          <div className={styles.faqText}>
            <p>
              Если у вас что-то не получается, вы можете перейти на страницу с
              <Link className={styles.linkFAQ} to={FAQ_ROUTE}>
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
});

export default ConfirmEmail;
