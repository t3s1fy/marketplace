import React, { useContext, useState } from "react";
import styles from "./BasketItem.module.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { CheckboxBasket } from "../checkbox/CheckboxBasket";
import HeartButton from "../heart_button/HeartButton";
import HeartButtonBasket from "../heart_button/HeartButtonBasket";
import BasketIcon from "../basket_button/BasketIcon";
import minus from "../../assets/icons/minus_icon.svg";
import plus from "../../assets/icons/plus_icon.svg";

const BasketItem = observer(({ item, isChecked, onCheckboxChange }) => {
  // Используем локальное состояние для количества товара в корзине
  const [quantity, setQuantity] = useState(1); // По умолчанию 1 товар

  // Увеличение количества товара в корзине
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Уменьшение количества товара в корзине
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // цена с учетом скидки, если она есть
  const discountedPrice = item.price - (item.price * item.discount) / 100;

  //Навигация для каждого товара
  const clickToCartItem = useNavigate();

  return (
    <div className={styles.cartBasket}>
      <CheckboxBasket
        isChecked={isChecked}
        onChange={() => onCheckboxChange(item.id)}
      />
      <div className={styles.cartElem}>
        <div className={styles.imgBlock}>
          <img src={item.img} alt="Картинка" />
        </div>
        <div className={styles.descriptionBlock}>
          <div className={styles.blockInfo}>
            <div className={styles.textBlock}>
              <p className={styles.productName}>{item.name}</p>
              <p className={styles.property}>
                <span className={styles.key}>Продавец: </span>
                <span className={styles.value}>Шойгу С. К.</span>
              </p>
              <p className={styles.property}>
                <span className={styles.key}>Цвет: </span>
                <span className={styles.value}>зеленый</span>
              </p>
              <div className={styles.btnBlock}>
                <button className={styles.ovalBtn}>
                  <HeartButtonBasket productId={item.id} />
                </button>
                <button className={styles.ovalBtn}>
                  <BasketIcon productId={item.id} />
                </button>
              </div>
            </div>
            <p className={styles.priceBlock}>
              {item.discount > 0 ? (
                <>
                  <span
                    className={styles.priceText}
                  >{`${discountedPrice}₽`}</span>
                  <span
                    className={styles.originalPrice}
                  >{`${item.price}₽`}</span>
                </>
              ) : (
                <span className={styles.priceText}>{`${item.price}₽`}</span>
              )}
            </p>
          </div>
          <div className={styles.countBlock}>
            <button onClick={handleDecrease} className={styles.quantityButton}>
              <img src={minus} alt="-" />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button onClick={handleIncrease} className={styles.quantityButton}>
              <img src={plus} alt="+" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BasketItem;
