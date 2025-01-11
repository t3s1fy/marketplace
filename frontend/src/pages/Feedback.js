import React, { useState } from "react";
import styles from "../styles/Feedback.module.css";
import { useNavigate } from "react-router-dom";
import ProfileContainer from "../components/profile_container/ProfileContainer";
import ModalExitUser from "../components/modal_window/ModalExitUser";
import line from "../assets/feedback_page_icons/feedback_header_image.png";
import logo from "../assets/feedback_page_icons/feedback_icon.svg";
import { PROFILE_ROUTE } from "../utils/consts";
import FeedbackList from "../components/feedback_elements/FeedbackList";

const Feedback = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={styles.feedbackPage}>
      <div className={styles.mainContainer}>
        <ProfileContainer state={modalActive} setState={setModalActive} />
        <div className={styles.feedbackContainer}>
          <div className={styles.headerFeedback}>
            <img src={line} alt="headerImage" />
            <div className={styles.headerInfoBlock}>
              <div className={styles.headerTitle}>
                <img src={logo} alt="logo" />
                <span>Мои отзывы</span>
              </div>
              <button onClick={() => navigate(PROFILE_ROUTE)}>
                Вернуться в личный кабинет
              </button>
            </div>
          </div>
          <div className={styles.mainFeedback}>
            <FeedbackList />
          </div>
        </div>
      </div>
      <ModalExitUser
        active={modalActive}
        setActive={setModalActive}
        title={"Вы точно хотите выйти\n" + "из аккаунта?"}
        subtitle={
          "после выхода из аккаунта вам придётся\n" +
          "заново вводить логин (почту) и пароль"
        }
        confirm={"Да, выйти"}
        action={"exit"}
      ></ModalExitUser>
    </div>
  );
};

export default Feedback;
