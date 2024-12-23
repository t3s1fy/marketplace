import React from "react";
import styles from "../styles/Basket.module.css";
import ProductList from "../components/device/ProductList";
import BasketList from "../components/device/BasketList";
const Basket = () => {
  return (
    <div className={styles.basketPage}>
      <p className={styles.basketTitle}>Корзина</p>
      <div className={styles.mainContainer}>
        <div className={styles.basketContainer}>
          <BasketList />
        </div>
        <div className={styles.productContainer}>
          <div className={styles.productBlock}>
            <div className={styles.titleContainer}>
              <p>Вы смотрели</p>
            </div>
            <div>
              <ProductList showDiscountsOnly={false} maxItems={6} />
            </div>
          </div>
          <div className={styles.productBlock}>
            <div className={styles.titleContainer}>
              <p>Рекомендуем для вас</p>
            </div>
            <div>
              <ProductList
                showDiscountsOnly={false}
                isBigger={true}
                maxItems={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
