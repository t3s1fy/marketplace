import React, { useState } from "react";
import s from "../../styles/seller_profile_pages_styles/SellerProfileMessages.module.css";
import SellerProfileContainer from "../../components/profile_container/SellerProfileContainer";
import line from "../../assets/seller_profile_assets/line_image.png";
import search from "../../assets/seller_profile_assets/search_icon.svg";
import message from "../../assets/seller_profile_assets/message_icon.svg";

const SellerProfileMessages = () => {
  const [anonymous, setAnonymous] = useState(false);

  const handleToggle = () => {
    setAnonymous((prev) => !prev); // Переключает между true и false
  };

  return (
    <div className={s.profilePage}>
      <SellerProfileContainer />
      <div className={s.container}>
        <img src={line} alt="line" />
        <div className={s.main}>
          <div className={s.mainHeader}>
            <p>Центр сообщений</p>
          </div>
          <div className={s.mainMain}>
            <div className={s.leftBlock}>
              <div className={s.searchBox}>
                <button>
                  <img src={search} alt="search" />
                </button>
                <input type="text" placeholder="Поиск..." />
              </div>
              <div className={s.changeMesasge}>
                <div className={s.changeMesasgeTitle}>
                  <img src={message} alt="message" />
                  <p>Только непрочитанные</p>
                </div>
                <button
                  className={`${s.toggleBtn} ${anonymous ? s.toggled : ""}`}
                  onClick={handleToggle}
                >
                  <div className={s.thumb}></div>
                </button>
              </div>
            </div>
            <div className={s.rightBlock}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfileMessages;
