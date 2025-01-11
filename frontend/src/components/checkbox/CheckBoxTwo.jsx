import React from "react";
import styles from "./CheckBoxTwo.module.css";

const CheckBoxTwo = ({ isChecked, onChange }) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange((prev) => !prev)}
        className={styles.checkboxElement}
      />
    </label>
  );
};

export default CheckBoxTwo;
