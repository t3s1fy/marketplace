import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../../../styles/profile_pages_styles/seller_registration_styles/SellerAuthTwo.module.css";
import {
  SELLER_AUTH_THREE_ROUTE,
  SELLER_PROFILE_ROUTE,
} from "../../../utils/consts";

const SellerAuthTwo = () => {
  const navigate = useNavigate();

  return (
    <div className={s.sellerAuthPage}>
      <div className={s.container}>
        <p className={s.title}>Регистрация продавца</p>
        <hr className={s.topLine} />
        <div className={s.containerMain}>
          <div className={s.textBlock}>
            <p className={s.info}>
              Вы можете ввести дополнительную почту, на которую будут приходить
              уведомления, связанные с личным кабинетом продавца.
            </p>
            <p className={s.info}>
              Если вы не введёте почту, уведомления будут приходить на ту почту,
              которую вы указывали при входе или регистрации на сайте.
            </p>
          </div>
          <div className={s.inputBlock}>
            <p>
              Почта для уведомлений <span>(опционально)</span>
            </p>
            <input type="email" />
          </div>
        </div>
        <hr className={s.bottomLine} />
        <div className={s.containerFooter}>
          <button onClick={() => navigate(-1)}>Назад</button>
          <button onClick={() => navigate(SELLER_PROFILE_ROUTE)}>Далее</button>
        </div>
      </div>
    </div>
  );
};

export default SellerAuthTwo;
