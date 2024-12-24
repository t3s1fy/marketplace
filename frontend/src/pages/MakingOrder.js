import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/MakingOrder.module.css";
import HeartButtonBasket from "../components/heart_button/HeartButtonBasket";
import BasketIcon from "../components/basket_button/BasketIcon";
import minus from "../assets/icons/minus_icon.svg";
import plus from "../assets/icons/plus_icon.svg";
const MakingOrder = () => {
  const location = useLocation();
  const { selectedProducts, totalCount, totalPrice, totalDiscount } =
    location.state || {};

  return (
    <div className={styles.orderPage}>
      <p className={styles.orderTitle}>Оформление заказа</p>
      <div className={styles.container}>
        <div className={styles.infoOrder}>
          <div className={styles.setPurshare}>
            <p className={styles.textTitle}>Выберите способ оплаты</p>
          </div>
          <div className={styles.setPickPoint}>
            <p className={styles.textTitle}>Выберите пункт выдачи</p>
          </div>
        </div>
        <div className={styles.orderBlock}>
          <button className={styles.linkToOrder}>Оформить</button>
          <p className={styles.faqOrder}>
            Оформляя заказ, вы соглашаетесь с условиями обработки персональных
            данных согласно политике конфиденциальности
          </p>
          <div className={styles.priceBlock}>
            <div className={styles.textBLock}>
              <span className={styles.boldText}>Ваша корзина</span>
              <span className={styles.textValueCount}>
                {totalCount} товара • вес
              </span>
            </div>
            <div className={styles.textBLock}>
              <span className={styles.text}>Товары ({totalCount})</span>
              <span className={styles.textValueSum}>{totalPrice}₽</span>
            </div>
            <div className={styles.textBLock}>
              <span className={styles.text}>Скидка</span>
              <span className={styles.textValueSale}>–{totalDiscount}₽</span>
            </div>
            <div className={styles.textBLock}>
              <span className={styles.text}>Стоимость доставки</span>
              <span className={styles.textValueDelivery}>Бесплатно</span>
            </div>
            <hr className={styles.line} />
            <div className={styles.textBLock}>
              <span className={styles.boldText}>Итоговая сумма</span>
              <span className={styles.textValueTotalSum}>
                {totalPrice - totalDiscount}₽
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.products}>
        <p className={styles.productsTitle}>Ожидаемая дата доставки: завтра</p>
        <div className={styles.productList}>
          {selectedProducts?.map((product) => (
            <div key={product.id} className={styles.cartElem}>
              <div className={styles.imgBlock}>
                <img src={product.img} alt="Картинка" />
              </div>
              <div className={styles.descriptionBlock}>
                <div className={styles.textBlock}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.property}>
                    <span className={styles.key}>Продавец: </span>
                    <span className={styles.value}>Шойгу С. К.</span>
                  </p>
                  <p className={styles.property}>
                    <span className={styles.key}>Цвет: </span>
                    <span className={styles.value}>зеленый</span>
                  </p>
                  <p className={styles.priceContainer}>
                    {product.discount > 0 ? (
                      <>
                        <span
                          className={styles.price}
                        >{`${product.price - (product.price * product.discount) / 100}₽`}</span>
                        <span
                          className={styles.originalPrice}
                        >{`${product.price}₽`}</span>
                      </>
                    ) : (
                      <span
                        className={styles.price}
                      >{`${product.price}₽`}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakingOrder;
