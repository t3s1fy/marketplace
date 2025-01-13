import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import s from "./styles/SellerProductList.module.css";
import ohNo from "../../assets/seller_profile_assets/oh_no_image.png";
import OrderCard from "./OrderCard";
import SellerProductItem from "./SellerProductItem";

const SellerProductList = observer(() => {
  const { item } = useContext(Context);

  const allProducts = item.items;
  console.log(allProducts);

  if (allProducts.length === 0) {
    return (
      <div className={s.noOrders}>
        <p className={s.title}>
          Ой, здесь пусто! Кажется, у вас не приобрели ни одного товара... :(
        </p>
        <img src={ohNo} alt="ohNoImage" />
      </div>
    );
  }

  return (
    <div className={s.orderList}>
      {allProducts.map((product) => (
        <SellerProductItem key={product.id} item={product} />
      ))}
    </div>
  );
});

export default SellerProductList;
