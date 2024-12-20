import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TypeItem.module.css";

const TypeItem = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.nameType}>{item.name}</div>
    </div>
  );
};

export default TypeItem;
