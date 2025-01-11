import React, { useState } from "react";
import s from "../../styles/profile_pages_styles/Delivery.module.css";
import ProfileContainer from "../../components/profile_container/ProfileContainer";
import line from "../../assets/feedback_page_icons/feedback_header_image.png";
import logo from "../../assets/delivery_page_icons/delivery_icon.svg";
import FeedbackList from "../../components/feedback_elements/FeedbackList";
import { useNavigate } from "react-router-dom";
import DeliveryList from "../../components/delivery_elements/DeliveryList";

const Delivery = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={s.deliveryPage}>
      <div className={s.mainContainer}>
        <ProfileContainer state={modalActive} setState={setModalActive} />
        <div className={s.deliveryContainer}>
          <div className={s.headerDelivery}>
            <img src={line} alt="headerImage" />
            <div className={s.headerInfoBlock}>
              <div className={s.headerTitle}>
                <img src={logo} alt="logo" />
                <span>Доставки</span>
              </div>
              <button onClick={() => navigate(-1)}>
                Вернуться в личный кабинет
              </button>
            </div>
          </div>
          <div className={s.mainDelivery}>
            <DeliveryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
