import React, { useContext, useState } from "react";
import { ReactComponent as HeartOutline } from "./icons/HeartOutline.svg";
import { ReactComponent as HeartFilled } from "./icons/HeartFilled.svg";
import { observer } from "mobx-react-lite";
import { Context } from "../../index"; // Импортируем контекст

const HeartButtonBasket = observer(({ productId }) => {
  const { item } = useContext(Context); // Получаем хранилище через контекст

  const isLiked = item.isFavorite(productId);

  // Обработчик нажатия
  const handleClick = () => {
    item.toggleFavorite(productId);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "inline-block",
        cursor: "pointer", // Указываем, что это кликабельный элемент
        width: "24px",
        height: "24px",
      }}
    >
      {/* Переключаем между иконками в зависимости от состояния */}
      {isLiked ? (
        <HeartFilled width={24} height={24} />
      ) : (
        <HeartOutline width={24} height={24} />
      )}
    </div>
  );
});

export default HeartButtonBasket;
