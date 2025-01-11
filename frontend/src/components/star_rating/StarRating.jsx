import React, { useState } from "react";
import styles from "./StarRating.module.css";
import starEmpty from "./assets/starEmpty.svg";
import starFilled from "./assets/starFilled.svg";

const StarRating = ({
  readOnly = false,
  rating = 0,
  currentItem,
  setCurrentItem,
  bigger = false,
}) => {
  const stars = Array(5).fill(0);

  const [hoverItem, setHoverItem] = useState(0);

  return (
    <div
      className={
        bigger ? `${styles.starList} ${styles.bigger}` : styles.starList
      }
    >
      {stars.map((item, index) => {
        const isFilled = readOnly
          ? index < rating
          : index < (hoverItem !== null ? hoverItem : currentItem);
        return (
          <div
            className={styles.starBlock}
            key={index}
            onClick={() => !readOnly && setCurrentItem(index + 1)}
            onMouseMove={() => !readOnly && setHoverItem(index + 1)}
            onMouseOut={() => !readOnly && setHoverItem(null)}
          >
            <img
              className={
                bigger ? `${styles.star} ${styles.bigger}` : styles.star
              }
              src={isFilled ? starFilled : starEmpty}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
