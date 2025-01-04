import React from "react";
import styles from "./ProductItem.module.css";
import HeartButton from "../heart_button/HeartButton";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import star from "../../assets/icons/productItemStar.svg";
import feedback from "../../assets/icons/productItemFeedback.svg";

const ProductItem = ({ item }) => {
  // цена с учетом скидки, если она есть
  const discountedPrice = item.price - (item.price * item.discount) / 100;

  //Навигация для каждого товара
  const clickToCartItem = useNavigate();

  const getCorrectForm = (length) => {
    if (length % 10 === 1 && length % 100 !== 11) {
      return "отзыв";
    } else if (
      length % 10 >= 2 &&
      length % 10 <= 4 &&
      (length % 100 < 10 || length % 100 >= 20)
    ) {
      return "отзыва";
    } else {
      return "отзывов";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgBlock}>
        <img src={item.img} alt="Картинка" />
        <div className={styles.btnHeart}>
          <HeartButton productId={item.id} />
        </div>
      </div>
      <div
        className={styles.descriptionBlock}
        onClick={() => clickToCartItem(PRODUCT_ROUTE + "/" + item.id)}
      >
        <div className={styles.priceBlock}>
          {item.discount > 0 ? (
            <>
              <div className={styles.price}>{`${discountedPrice}₽`}</div>
              <div className={styles.oldPrice}>{`${item.price}₽`}</div>
              <div
                className={styles.discountPercent}
              >{`-${item.discount}%`}</div>
            </>
          ) : (
            <div className={styles.price}>{`${item.price}₽`}</div>
          )}
        </div>
        <div className={styles.nameElem}>{item.name}</div>
        <div className={styles.productInfoBlock}>
          <div className={styles.infoTextRating}>
            <img src={star} alt="star" />
            <span className={styles.ValueText}>{item.rating}</span>
          </div>
          <div className={styles.infoTextFeedback}>
            <img src={feedback} alt="feedback" />
            <span
              className={styles.ValueText}
            >{`${item.feedback} ${getCorrectForm(item.feedback)}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
