import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./BasketList.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import BasketItem from "./BasketItem";
import checkbox_icon from "../../assets/icons/checkbox_icon.svg";

const BasketList = observer(({ maxItems }) => {
  const { item } = useContext(Context);
  const { user } = useContext(Context);

  // Состояние для каждого чекбокса
  const [selectedItems, setSelectedItems] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false); // Флаг для состояния "Выбрать все"

  // Отображаемые товары
  const displayedItems = item.items
    .filter((product) => item.basket.includes(product.id))
    .slice(0, maxItems);

  const navigate = useNavigate();

  // Обработчик кнопки "Выбрать все"
  const handleSelectAll = () => {
    const newSelectedItems = {};
    displayedItems.forEach((product) => {
      newSelectedItems[product.id] = !isAllSelected;
    });
    setSelectedItems(newSelectedItems);
    setIsAllSelected(!isAllSelected); // Меняем флаг "Выбрать все"
  };

  // Обработчик изменения состояния чекбокса для отдельного товара
  const handleCheckboxChange = (productId) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  // Подсчитываем количество товаров
  const totalCount = Object.values(selectedItems).filter(
    (isSelected) => isSelected,
  ).length;

  return (
    <div>
      {displayedItems.length > 0 ? (
        <div className={styles.basketContainer}>
          <div className={styles.basketBlock}>
            <button onClick={handleSelectAll} className={styles.setAllBtn}>
              <img src={checkbox_icon} alt="set_all" />
              <span>Выбрать всё</span>
            </button>
            <div className={styles.basketList}>
              {displayedItems.map((product) => (
                <BasketItem
                  key={product.id}
                  item={product}
                  isChecked={selectedItems[product.id] || false}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className={styles.orderBlock}>
            <button className={styles.linkToOrder}>Перейти к оформлению</button>
            <p className={styles.faqOrder}>
              Доступные способы и время доставки можно выбрать при оформлении
              заказа
            </p>
            <div className={styles.priceBlock}>
              <div className={styles.textBLock}>
                <span className={styles.boldText}>Ваша корзина</span>
                <span className={styles.textValueCount}>
                  {totalCount} товара • вес
                </span>
              </div>
              <div className={styles.textBLock}>
                <span className={styles.text}>Товары ({totalCount})</span>
                <span className={styles.textValueSum}>1793₽</span>
              </div>
              <div className={styles.textBLock}>
                <span className={styles.text}>Скидка</span>
                <span className={styles.textValueSale}>–1109₽</span>
              </div>
              <div className={styles.textBLock}>
                <span className={styles.text}>Стоимость доставки</span>
                <span className={styles.textValueDelivery}>Бесплатно</span>
              </div>
              <hr className={styles.line} />
              <div className={styles.textBLock}>
                <span className={styles.boldText}>Итоговая сумма</span>
                <span className={styles.textValueTotalSum}>684₽</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.basketNotFound}>
          <p className={styles.titleText}>
            Упс! Кажется, ваша корзина пуста...
          </p>
          {user.isAuth ? (
            <>
              <p className={styles.textError}>
                Вы можете воспользоваться поиском, чтобы найти нужное, или же
                надавить на кнопку и перейти на главную страницу
              </p>
              <Link to={SHOP_ROUTE} className={styles.nextStepBtn}>
                Перейти к покупкам
              </Link>
            </>
          ) : (
            <>
              <p className={styles.textError}>
                Зарегистрируйтесь или войдите в аккаунт, чтобы иметь возможность
                покупать интересующие вас товары!
              </p>
              <Link to={LOGIN_ROUTE} className={styles.nextStepBtn}>
                Войти в аккаунт
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default BasketList;
