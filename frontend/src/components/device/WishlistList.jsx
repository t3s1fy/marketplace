import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import ProductItem from "./ProductItem";
import styles from "./WishlistList.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const WishlistList = observer(({ maxItems }) => {
  const { item } = useContext(Context);
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const displayedItems = item.items
    .filter((product) => item.favorites.includes(product.id))
    .slice(0, maxItems);

  return (
    <div className={styles.productList}>
      {displayedItems.length > 0 ? (
        displayedItems.map((product) => (
          <ProductItem key={product.id} item={product} />
        ))
      ) : (
        <div className={styles.wishlistNotFound}>
          <p className={styles.titleText}>
            Упс! Кажется, у вас нет избранных товаров...
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
                добавлять интересующие вас товары в избранное и находить их в
                любое время!
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

export default WishlistList;
