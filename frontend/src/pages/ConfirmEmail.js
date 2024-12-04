import React from "react";
import { Link } from "react-router-dom";
import "../styles/ConfirmEmail.css";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useInput } from "../components/validation/validation";
import { values } from "mobx";

const ConfirmEmail = () => {
  const code = useInput("", { isEmpty: true, minLength: 6 });
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
              onChange={(e) => code.onChange(e)}
              onBlur={(e) => code.onBlur(e)}
              value={code.value}
              type="text"
              name="verificationCode"
              id="verificationCode"
              placeholder=""
            />
            <div className="valid-block">
              <a className="send-code-again" href="#">
                отправить новый код
              </a>
              <div>
                {code.isDirty && code.isEmpty && (
                  <p className="valid-error">Поле не может быть пустым</p>
                )}
                {code.isDirty && code.minLengthError && (
                  <p className="valid-error">Некорректная длина</p>
                )}
              </div>
            </div>
          </div>
          <button className="confirm-btn" disabled={!code.inputValid}>
            Подтвердить
          </button>
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
