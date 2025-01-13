import React, { useState } from "react";
import s from "./DropDown.module.css";
import filter from "../../assets/seller_profile_assets/filter_icon.svg";
import arrow from "../../assets/seller_profile_assets/arrow.svg";
const Dropdown = ({
  label,
  options,
  selectedOption,
  onSelect,
  isDay = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option); // Передаем выбранное значение в родительский компонент
    setIsOpen(false); // Закрываем выпадающий список
  };

  return (
    <div className={s.dropdown}>
      <div
        className={s.dropdownLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          className={`${s.filter} ${selectedOption ? s.select : null}`}
          src={filter}
          alt="filter"
        />
        <p className={`${s.title} ${selectedOption ? s.select : null}`}>
          {isDay
            ? selectedOption
              ? "выбрано: " + selectedOption
              : label
            : selectedOption || label}
        </p>
        <img
          className={`${s.arrow} ${isOpen ? s.open : null}`}
          src={arrow}
          alt="arrow"
        />
      </div>
      {isOpen && isDay && (
        <div className={s.dropdownMenuDay}>
          {options.map((option, index) => (
            <div
              key={index}
              className={s.dropdownItemDay}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {isOpen && !isDay && (
        <div className={s.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={s.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
