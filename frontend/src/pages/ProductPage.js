import React from "react";
import styles from "../styles/ProductPage.module.css";
const ProductPage = () => {
  return (
    <div className={styles.productPage}>
      <p className={styles.title}>Товар</p>
      <div className={styles.productContainer}>
        <div className={styles.pictureContainer}>
          <div className={styles.pictureBlock}>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
          </div>
          <div className={styles.productPicture}></div>
        </div>
        <div className={styles.descriptionContainer}></div>
      </div>
      <div className={styles.productList}></div>
      <div className={styles.feedbackList}></div>
      <div></div>
    </div>
  );
};

export default ProductPage;
