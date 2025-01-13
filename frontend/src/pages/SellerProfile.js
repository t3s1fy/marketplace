import React, { useContext } from "react";
import s from "../styles/SellerProfile.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../index";
import SellerProfileContainer from "../components/profile_container/SellerProfileContainer";
import line from "../assets/seller_profile_assets/line_image.png";

const SellerProfile = () => {
  const location = useLocation();
  const { user } = useContext(Context);

  return (
    <div className={s.profilePage}>
      <SellerProfileContainer />
      <div className={s.container}>
        <img src={line} alt="line" />
        <div className={s.main}>
          <div className={s.leftMain}>
            <div className={s.miniBlock}>
              <div className={s.miniBlockHeader}>
                <p>Текущий баланс</p>
              </div>
            </div>
            <div className={s.miniBlock}>
              <div className={s.miniBlockHeader}>
                <p>Доход</p>
              </div>
            </div>
            <div className={s.miniBlock}>
              <div className={s.miniBlockHeader}>
                <p>Чистый доход (без процента)</p>
              </div>
            </div>
          </div>
          <div className={s.rightMain}>
            <div className={s.bigBlock}>
              <div className={s.bigBlockHeader}>
                <p>Продажи</p>
              </div>
            </div>
            <div className={s.bigBlock}>
              <div className={s.bigBlockHeader}>
                <p>Недавние заказы</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
