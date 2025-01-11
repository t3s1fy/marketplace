import React, { useContext, useState } from "react";
import styles from "./styles/FeedbackCard.module.css";
import { Context } from "../../index";
import ModalFeedback from "../modal_window/ModalFeedback";
import StarRating from "../star_rating/StarRating";
import { useNavigate } from "react-router-dom";
import { EDIT_FEEDBACK_ROUTE } from "../../utils/consts";

const FeedbackCard = ({ item, openModal }) => {
  const { item: productStore } = useContext(Context); // Получаем доступ к store товаров

  const navigate = useNavigate();

  // Находим товар по productId
  const product = productStore.items.find(
    (product) => product.id === item.productId,
  );

  return (
    <div className={styles.card}>
      <div className={styles.btnContainer}>
        <div className={styles.status}>{item.status}</div>
        <div className={styles.block}>
          <button className={styles.deleteBtn} onClick={openModal}>
            Удалить
          </button>
          <button
            className={styles.editBtn}
            onClick={() => navigate(EDIT_FEEDBACK_ROUTE + "/" + item.id)}
          >
            Редактировать
          </button>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <img
          className={styles.productImg}
          src={product.img}
          alt="productImage"
        />
        <div className={styles.descriptionBlock}>
          <div className={styles.feedbackInfo}>
            <StarRating rating={item.rating} readOnly={true} />
            <p className={styles.date}>{item.date}</p>
          </div>
          <p className={styles.productName}>{product.name}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
