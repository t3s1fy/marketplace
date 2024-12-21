import React, { useContext, useState } from "react";
import { ReactComponent as HeartOutline } from "./icons/HeartOutline.svg";
import { ReactComponent as HeartFilled } from "./icons/HeartFilled.svg";
import { observer } from "mobx-react-lite";
import { Context } from "../../index"; // Импортируем контекст

const HeartButtonExtra = observer(({ productId }) => {
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
        width: "40px",
        height: "40px",
      }}
    >
      {/* Переключаем между иконками в зависимости от состояния */}
      {isLiked ? (
        <HeartFilled width={40} height={40} />
      ) : (
        <HeartOutline width={40} height={40} />
      )}
    </div>
  );
});

export default HeartButtonExtra;
