import React, { useEffect } from "react";

export const UseClickOutside = (ref, buttonRef, callback) => {
  const handleClick = (e) => {
    // Игнорируем клик, если он был на кнопке открытия меню
    if (buttonRef.current && buttonRef.current.contains(e.target)) {
      return;
    }

    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};
