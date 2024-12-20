import React from "react";
import styles from "../styles/Shop.module.css";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import ProductList from "../components/device/ProductList";
import TypesList from "../components/type/TypesList";

const Shop = observer(() => {
  return (
    <div className={styles.shopMainPage}>
      <Link to={""} className={styles.currentPromotion}>
        ТЕКУЩАЯ АКЦИЯ
      </Link>
      <div className={styles.productContainer}>
        <div className={styles.productBlock}>
          <div className={styles.titleContainer}>
            <p>Товары с топовой выгодой по акции</p>
            <Link to="#" className={styles.btnNext}>
              Далее
            </Link>
          </div>
          <div>
            <ProductList showDiscountsOnly={true} maxItems={6} />
          </div>
        </div>
        <div className={styles.productBlock}>
          <div className={styles.titleContainer}>
            <p>Популярные предложения</p>
            <Link to="#" className={styles.btnNext}>
              Далее
            </Link>
          </div>
          <div>
            <ProductList showDiscountsOnly={false} maxItems={6} />
          </div>
        </div>
        <div className={styles.productBlock}>
          <div className={styles.titleContainer}>
            <p>Вы смотрели</p>
          </div>
          <div>
            <ProductList showDiscountsOnly={false} maxItems={6} />
          </div>
        </div>
        <div className={styles.productBlock}>
          <TypesList maxTypes={3} isBigger={true} />
        </div>
        <div className={styles.productBlock}>
          <div className={styles.titleContainer}>
            <p>Выбери любую категорию</p>
            <Link to="#" className={styles.btnNext}>
              Больше
            </Link>
          </div>
          <div>
            <TypesList maxTypes={6} isBigger={false} />
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
  );
});

export default Shop;
