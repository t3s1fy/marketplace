import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import ohNo from "../../assets/seller_profile_assets/oh_no_image.png";
import s from "./styles/OrdersList.module.css";
import AlertCard from "../alert_elements/AlertCard";
import OrderCard from "./OrderCard";

const OrdersList = observer(({ filters }) => {
  const { order } = useContext(Context);

  const timeToMinutes = (time) => {
    if (!time) return 0; // Если времени нет, возвращаем 0 минут
    const [hour, minute] = time.split(":");
    return parseInt(hour) * 60 + parseInt(minute);
  };

  const filteredOrders = order.order.filter((o) => {
    const [day, month, year] = o.date.split("/");

    // Преобразование дня и года
    const dayWithoutLeadingZero = parseInt(day); // Убираем ведущий ноль
    const fullYear = `20${year}`; // Преобразуем в полный год

    // Преобразование времени в минуты
    const orderMinutes = timeToMinutes(o.orderTime);

    // Преобразование времени фильтра
    const [startTime, endTime] = filters.time.split(" - ");
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Фильтрация по дню, месяцу и году
    const matchesDay =
      !filters.day || parseInt(filters.day) === dayWithoutLeadingZero;
    const matchesMonth =
      !filters.month ||
      new Date(0, parseInt(month) - 1)
        .toLocaleString("ru-RU", { month: "long" })
        .toLowerCase() === filters.month.toLowerCase();
    const matchesYear =
      !filters.year || parseInt(filters.year) === parseInt(fullYear);

    // Фильтрация по времени
    const matchesTime =
      !filters.time ||
      (orderMinutes >= startMinutes && orderMinutes < endMinutes);

    return matchesDay && matchesMonth && matchesYear && matchesTime;
  });

  if (filteredOrders.length === 0) {
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
      {filteredOrders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
});

export default OrdersList;
