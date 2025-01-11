import React, { useState } from "react";
import s from "../../styles/profile_pages_styles/Purchares.module.css";
import { useNavigate } from "react-router-dom";
import ProfileContainer from "../../components/profile_container/ProfileContainer";
import line from "../../assets/feedback_page_icons/feedback_header_image.png";
import logo from "../../assets/purchares_page_icons/purchares_icon.svg";
import DeliveryList from "../../components/delivery_elements/DeliveryList";
import PurcharesList from "../../components/purchares_elements/PurcharesList";

const Purchares = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={s.purcharesPage}>
      <div className={s.mainContainer}>
        <ProfileContainer state={modalActive} setState={setModalActive} />
        <div className={s.purcharesContainer}>
          <div className={s.headerPurchares}>
            <img src={line} alt="headerImage" />
            <div className={s.headerInfoBlock}>
              <div className={s.headerTitle}>
                <img src={logo} alt="logo" />
                <span>Мои покупки</span>
              </div>
              <button onClick={() => navigate(-1)}>
                Вернуться в личный кабинет
              </button>
            </div>
          </div>
          <div className={s.mainPurchares}>
            <PurcharesList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchares;
