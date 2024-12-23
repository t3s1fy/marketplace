import React from "react";
import styles from "./CheckboxBasket.module.css";

export const CheckboxBasket = ({ isChecked, onChange, children }) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange((prev) => !prev)}
        className={styles.checkboxElement}
      />
      <p>{children}</p>
    </label>
  );
};
