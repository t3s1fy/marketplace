import React, { useState } from "react";
import s from "../../../styles/profile_pages_styles/seller_registration_styles/SellerAuthOne.module.css";
import InputMask from "react-input-mask";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../components/checkbox/Checkbox.module.css";
import CheckBoxTwo from "../../../components/checkbox/CheckBoxTwo";
import { SELLER_AUTH_TWO_ROUTE } from "../../../utils/consts";

const SellerAuthOne = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rulesChecked, setRulesChecked] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className={s.sellerAuthPage}>
      <div className={s.container}>
        <p className={s.title}>Регистрация продавца</p>
        <hr className={s.topLine} />
        <div className={s.containerMain}>
          <div className={s.inputBlock}>
            <p>Имя</p>
            <input type="text" />
          </div>
          <div className={s.inputBlock}>
            <p>Фамилия</p>
            <input type="text" />
          </div>
          <div className={s.inputBlock}>
            <p>Отчество</p>
            <input type="text" />
          </div>
          <div className={s.inputBlock}>
            <p>Номер телефона</p>
            <InputMask
              mask="+7 (999) 999-99-99"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          <form className={s.form}>
            <CheckBoxTwo
              isChecked={rulesChecked}
              onChange={setRulesChecked}
              sellerAuth={true}
            ></CheckBoxTwo>
            <p>Подтверждая, вы соглашаетесь с условиями договора.</p>
          </form>
        </div>
        <hr className={s.bottomLine} />
        <div className={s.containerFooter}>
          <button onClick={() => navigate(-1)}>Назад</button>
          <button
            onClick={() => navigate(SELLER_AUTH_TWO_ROUTE)}
            disabled={!rulesChecked}
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAuthOne;
