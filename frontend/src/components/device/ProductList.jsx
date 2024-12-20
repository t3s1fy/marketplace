import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import ProductItem from "./ProductItem";
import ProductItemBigger from "./ProductItemBigger";
import styles from "./ProductList.module.css";

const ProductList = observer(
  ({ showDiscountsOnly, maxItems, isBigger = false }) => {
    const { item } = useContext(Context);

    const filteredItems = showDiscountsOnly
      ? item.items.filter((product) => product.discount > 0) // Показываем только товары со скидкой
      : item.items; // Показываем все товары

    // Ограничиваем количество карточек до maxItems
    const displayedItems = filteredItems.slice(0, maxItems);

    return (
      <div className={isBigger ? styles.productListBigger : styles.productList}>
        {displayedItems.map((product) =>
          isBigger ? (
            <ProductItemBigger key={product.id} item={product} />
          ) : (
            <ProductItem key={product.id} item={product} />
          ),
        )}
      </div>
    );
  },
);

export default ProductList;
