import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./styles/FeedbackList.module.css";
import { Context } from "../../index";
import FeedbackCard from "./FeedbackCard";
import ModalFeedback from "../modal_window/ModalFeedback";

const FeedbackList = observer(({ maxFeedbacks }) => {
  const { item } = useContext(Context);

  const [modalActive, setModalActive] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null); // Текущий отзыв, который нужно удалить

  const allFeedbacks = item.feedback;

  const displayedFeedbacks = maxFeedbacks
    ? allFeedbacks.slice(0, maxFeedbacks)
    : allFeedbacks;

  if (displayedFeedbacks.length === 0) {
    return (
      <p className={styles.noFeedback}>Отзывов пока нет. Оставьте первый!</p>
    );
  }

  // Открытие модального окна и установка текущего отзыва для удаления
  const openModal = (feedback) => {
    setCurrentFeedback(feedback); // Устанавливаем отзыв, который нужно удалить
    setModalActive(true); // Открываем модальное окно
  };

  const deleteFeedback = () => {
    if (currentFeedback !== null) {
      console.log("Удаляем отзыв с id:", currentFeedback.id); // Показываем ID отзыва
      item.removeFeedback(currentFeedback.id); // Передаем только id
      setModalActive(false); // Закрываем модальное окно
    }
  };

  return (
    <div className={styles.feedbackList}>
      {displayedFeedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          item={feedback}
          openModal={() => openModal(feedback)}
        />
      ))}

      {modalActive && (
        <ModalFeedback
          active={modalActive}
          setActive={setModalActive}
          deleteFeedback={deleteFeedback}
        />
      )}
    </div>
  );
});

export default FeedbackList;
