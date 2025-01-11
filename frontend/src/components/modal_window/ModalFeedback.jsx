import Reactm, { useContext } from "react";
import styles from "./ModalFeedback.module.css";
import crossMini from "./assets/crossMini.svg";

const ModalFeedback = ({ active, setActive, deleteFeedback }) => {
  return (
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modalContent} ${styles.active}`
            : `${styles.modalContent}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.crossBtn} onClick={() => setActive(false)}>
          <img src={crossMini} alt="Cross" />
        </button>
        <div className={styles.main}>
          <>
            <p className={styles.title}>Удаление отзыва</p>
            <p className={styles.info}>
              {
                "Вы точно хотите удалить выбранный отзыв? Отменить действие будет невозможно. Написать новый отзыв на данный товар вы не сможете, его придётся заказывать повторно. Если вы хотите изменить отзыв, нажмите “Редактировать” в правом верхнем углу отзыва."
              }
            </p>
            <button className={styles.exit} onClick={deleteFeedback}>
              Удалить
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default ModalFeedback;
