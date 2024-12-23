import React, { useContext } from "react";
import { ReactComponent as Basket } from "./icons/basket_icon.svg";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const BasketIcon = observer(({ productId }) => {
  const { item } = useContext(Context); // Получаем хранилище через контекст

  const handleRemoveFromBasket = () => {
    item.removeFromBasket(productId);
    // Удаляем товар по его ID
  };

  return (
    <div
      onClick={handleRemoveFromBasket}
      style={{
        display: "inline-block",
        cursor: "pointer", // Указываем, что это кликабельный элемент
        width: "15px",
        height: "18px",
      }}
    >
      <Basket width={15} height={18} />
    </div>
  );
});

export default BasketIcon;
