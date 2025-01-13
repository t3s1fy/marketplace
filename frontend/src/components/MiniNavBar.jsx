import React from "react";
import s from "../styles/MiniNavBar.module.css";

const MiniNavBar = () => {
  return (
    <div className={s.navbar}>
      <div className={s.avatar}>0_0</div>
      <p className={s.email}>vladimir.putin@mail.ru</p>
    </div>
  );
};

export default MiniNavBar;
