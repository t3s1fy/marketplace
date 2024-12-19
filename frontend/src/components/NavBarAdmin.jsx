import React from "react";
import style from "../styles/NavBarAdmin.module.css";
import { NavLink } from "react-router-dom";

const NavBarAdmin = () => {
  return (
    <header>
      <div className={style.navbarTop}>
        <p>Admin Panel</p>
      </div>
    </header>
  );
};

export default NavBarAdmin;
