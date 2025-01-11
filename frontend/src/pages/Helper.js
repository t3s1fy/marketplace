import React from "react";
import styles from "../styles/Helper.module.css";
import line from "../assets/icons/headerImageBigger.png";
import logo from "../assets/icons/changeProfileIcon.svg";
import { PROFILE_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const Helper = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.servicePage}>
      <div className={styles.container}>
        <div className={styles.serviceHeader}>
          <img src={line} alt="headerImage" />
          <div className={styles.headerInfoBlock}>
            <div className={styles.headerTitle}>
              <img src={logo} alt="logo" />
              <span>Сервис и помощь</span>
            </div>
            <button onClick={() => navigate(-1)}>
              Вернуться в личный кабинет
            </button>
          </div>
        </div>
        <div className={styles.serviceBody}>
          <p className={styles.description}>
            Если у вас возникли{" "}
            <span className={styles.descriptionSpan}>вопросы</span> или{" "}
            <span className={styles.descriptionSpan}>проблемы</span>, свяжитесь
            с нашей службой технической поддержки. Для этого:
          </p>
          <ol className={styles.stepsList}>
            <li>
              В <span className={styles.descriptionSpan}>теме письма</span>{" "}
              кратко опишите суть обращения (например, “Ошибка оплаты заказа”).
            </li>
            <li>
              В <span className={styles.descriptionSpan}>теле письма</span>{" "}
              опишите вашу проблему максимально подробно. Укажите: что
              произошло, дату и время возникновения проблемы, приложите
              материалы (фото, скриншоты), которые помогут разобраться в
              ситуации.
            </li>
            <li>
              В <span className={styles.descriptionSpan}>конце письма</span>{" "}
              обязательно укажите свои контактные данные для обратной связи.
              Если вы их не укажете, наш ответ придёт на ту почту, с которой
              было отправлено письмо о проблеме.
            </li>
            <li>
              Отправьте письмо на нашу почту техподдержки:{" "}
              <span className={styles.descriptionSpan}>
                marketplaceprojectt@yandex.ru
              </span>
              .
            </li>
          </ol>
          <p className={styles.description}>
            Мы стараемся отвечать на письма с вопросами и проблемами в течение{" "}
            <span className={styles.descriptionSpan}>24 часов</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Helper;
