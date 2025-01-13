import React, { useState } from "react";
import SellerProfileContainer from "../../components/profile_container/SellerProfileContainer";
import s from "../../styles/seller_profile_pages_styles/SellerProfileOrders.module.css";
import line from "../../assets/seller_profile_assets/line_image.png";
import search from "../../assets/seller_profile_assets/search_icon.svg";

import { observer } from "mobx-react-lite";
import Dropdown from "../../components/dropdown/DropDown";
import OrdersList from "../../components/orders_elemnts/OrdersList";

const SellerProfileOrders = observer(() => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1–31
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i); // Например, 2020–2029
  const times = [
    "00:00 - 01:00",
    "01:00 - 02:00",
    "02:00 - 03:00",
    "03:00 - 04:00",
    "04:00 - 05:00",
    "05:00 - 06:00",
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00",
    "23:00 - 00:00",
  ];

  const resetFilters = () => {
    setSelectedDay("");
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedTime("");
  };

  return (
    <div className={s.profilePage}>
      <SellerProfileContainer />
      <div className={s.container}>
        <img src={line} alt="line" />
        <div className={s.main}>
          <div className={s.mainHeader}>
            <p>Заказы</p>
          </div>
          <div className={s.mainMain}>
            <div className={s.filterBlock}>
              <Dropdown
                label="День"
                options={days}
                selectedOption={selectedDay}
                onSelect={(day) => setSelectedDay(day)}
                isDay={true}
              />
              <Dropdown
                label="Месяц"
                options={months}
                selectedOption={selectedMonth}
                onSelect={(month) => setSelectedMonth(month)}
              />
              <Dropdown
                label="Год"
                options={years}
                selectedOption={selectedYear}
                onSelect={(year) => setSelectedYear(year)}
              />
              <Dropdown
                label="Время"
                options={times}
                selectedOption={selectedTime}
                onSelect={(time) => setSelectedTime(time)}
              />
              <button className={s.dropBtn} onClick={resetFilters}>
                Сбросить
              </button>
            </div>
            <div className={s.infoBlock}>
              <div className={s.infoHeader}>
                <p>Номер заказа</p>
                <p>Доход с заказа</p>
                <p>
                  Чистый доход <br /> (без процента)
                </p>
                <p>Время заказа</p>
                <p>Дата заказа</p>
                <p>Статус заказа</p>
              </div>
              <OrdersList
                filters={{
                  day: selectedDay,
                  month: selectedMonth,
                  year: selectedYear,
                  time: selectedTime,
                }}
              />
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

export default SellerProfileOrders;
