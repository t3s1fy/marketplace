import React from "react";
import styles from "../styles/Wishlist.module.css";
import ProductList from "../components/device/ProductList";
import WishlistList from "../components/device/WishlistList";

const Wishlist = () => {
  return (
    <div className={styles.WishlistPage}>
      <p className={styles.WishlistTitle}>Избранное</p>
      <div className={styles.productContainer}>
        <div className={styles.productBlock}>
          <div className={styles.titleContainer}>
            <p>Ваши товары в избранном</p>
          </div>
          <div>
            <WishlistList />
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
};

export default Wishlist;
