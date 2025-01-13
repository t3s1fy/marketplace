import React from "react";
import { observer } from "mobx-react-lite";
import s from "../../styles/seller_profile_pages_styles/SellerProfileProducts.module.css";
import SellerProfileContainer from "../../components/profile_container/SellerProfileContainer";
import line from "../../assets/seller_profile_assets/line_image.png";
import Dropdown from "../../components/dropdown/DropDown";
import OrdersList from "../../components/orders_elemnts/OrdersList";
import SellerProductList from "../../components/orders_elemnts/SellerProductList";

const SellerProfileProducts = observer(() => {
  return (
    <div className={s.profilePage}>
      <SellerProfileContainer />
      <div className={s.container}>
        <img src={line} alt="line" />
        <div className={s.main}>
          <div className={s.mainHeader}>
            <p>Товары</p>
            <button>Добавить товар</button>
          </div>
          <div className={s.mainMain}>
            <div className={s.infoBlock}>
              <div className={s.infoHeader}>
                <p>Фото</p>
                <p>Название</p>
                <p>Категория</p>
                <p>Подкатегория</p>
                <p>Кол-во</p>
                <p>Цена</p>
                <p>Действия</p>
              </div>
              <SellerProductList />
            </div>
            <div className={s.btnContainer}>
              <button>Назад</button>
              <div>1</div>
              <button>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SellerProfileProducts;
