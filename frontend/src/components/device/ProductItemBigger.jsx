import React from "react";
import styles from "./ProductItemBigger.module.css";
import HeartButton from "../heart_button/HeartButton";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import HeartButtonBigger from "../heart_button/HeartButtonBigger";

const ProductItemBigger = ({ item }) => {
  // цена с учетом скидки, если она есть
  const discountedPrice = item.price - (item.price * item.discount) / 100;

  //Навигация для каждого товара
  const clickToCartItem = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imgBlock}>
        <img src={item.img} alt="Картинка" />
        <div className={styles.btnHeart}>
          <HeartButtonBigger productId={item.id} />
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
      </div>
    </div>
  );
};

export default ProductItemBigger;
