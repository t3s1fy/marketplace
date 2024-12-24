import React, { useContext } from "react";
import styles from "../styles/ProductPage.module.css";
import { observer } from "mobx-react-lite";
import arrowBtn from "../assets/icons/arrowBtn.svg";
import starMini from "../assets/icons/starMini.svg";
import { Link, useParams } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import copy from "../assets/icons/copy_link_icon.svg";
import share from "../assets/icons/share_link_icon.svg";
import triangle from "../assets/icons/triagle_icon.svg";
import caret from "../assets/icons/carret_icon.svg";
import HeartButton from "../components/heart_button/HeartButton";
import HeartButtonExtra from "../components/heart_button/HeartButtonExtra";
import ProductList from "../components/device/ProductList";

const ProductPage = observer(() => {
  const { id } = useParams(); // Извлекаем id товара из URL
  const { item } = useContext(Context); // Получаем данные из контекста

  const product = item.items.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div className={styles.productPage}>Товар не найден</div>;
  }

  const handleAddToCart = () => {
    item.addToBasket(product.id);
    alert("Товар добавлен в корзину!");
  };

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const differencePrice = product.price - discountedPrice;

  // Логика доступности товара
  let availability;
  if (product.count === 0) {
    availability = "Нет в наличии";
  } else if (product.count < 10) {
    availability = "Осталось мало";
  } else {
    availability = "Есть";
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.headerBlock}>
        <div className={styles.titleBlock}>
          <Link to={SHOP_ROUTE} className={styles.arrowBtn}>
            <img src={arrowBtn} alt="arrow" />
          </Link>
          <p className={styles.title}>
            Главная / Категория / Подкатегория / Бренд-ИП
          </p>
        </div>
        <div className={styles.shareContainer}>
          <div className={styles.articuleBlock}>
            <img src={copy} alt="copy_link_icon" />
            <p>{`Артикул: ${product.id}`}</p>
          </div>
          <div className={styles.shareBlock}>
            <img src={share} alt="share_link_icon" />
            <p>Поделиться</p>
          </div>
        </div>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.pictureContainer}>
          <div className={styles.pictureBlock}>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
            <div className={styles.productPictureMini}></div>
          </div>
          <div className={styles.productPicture}>
            <img src={product.img} alt="картинка" />
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.nameProduct}>{product.name}</p>
          <div className={styles.ratingBlock}>
            <img src={starMini} alt="star" />
            <p className={styles.ratingText}>{product.rating}</p>
            <p className={styles.cntFeedbackText}>10 отзывов</p>
            <hr className={styles.line} />
            <p className={styles.cntProduct}>{availability}</p>
          </div>
          <p className={styles.property}>
            <span className={styles.propertyKey}>Цвет: </span>
            <span className={styles.propertyValue}>бла-бла-бла</span>
          </p>
          <div className={styles.colorBlock}>
            <div className={styles.colorElem}></div>
            <div className={styles.colorElem}></div>
            <div className={styles.colorElem}></div>
            <div className={styles.colorElem}></div>
            <div className={styles.colorElem}></div>
          </div>
          <p className={styles.descriptionTitle}>О товаре</p>
          <div className={styles.propertyContainer}>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Страна производства: </span>
              <span className={styles.propertyValue}>Китай</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
            <p className={styles.property}>
              <span className={styles.propertyKey}>Свойство: </span>
              <span className={styles.propertyValue}>бла-бла-бла</span>
            </p>
          </div>
          <Link to={null} className={styles.allProperty}>
            Все характеристики и описание
          </Link>
        </div>
        <div className={styles.orderContainer}>
          <p className={styles.price}>
            {product.discount > 0 ? (
              <>
                <span
                  className={styles.priceText}
                >{`${discountedPrice}₽`}</span>
                <span
                  className={styles.originalPrice}
                >{`${product.price}₽`}</span>
              </>
            ) : (
              <span className={styles.priceText}>{`${product.price}₽`}</span>
            )}
          </p>
          <p className={styles.priceDynamicTitle}>динамика цен</p>
          <div className={styles.priceDynamicBox}>
            <div className={styles.priceDynamicText}>
              <img src={triangle} alt="triangle" />
              <p>{`${differencePrice}₽`}</p>
            </div>
            <div className={styles.showAllDynamic}>
              <img src={caret} alt="caret" />
            </div>
          </div>
          <div className={styles.addToCart}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </button>
            <div className={styles.addToWishlistButton}>
              <HeartButtonExtra productId={product.id} />
            </div>
          </div>
          <button className={styles.buyNowBtn}>Купить сейчас</button>
          <p className={styles.deliveryTime}>
            <span className={styles.deliveryTimeKey}>доставим </span>
            <span className={styles.deliveryTimeValue}>завтра</span>
          </p>
          <div className={styles.brandRating}>
            <p>Имя бренда</p>
            <img src={starMini} alt="" />
            <p>{product.rating}</p>
          </div>
        </div>
      </div>
      <div className={styles.productBlock}>
        <div className={styles.titleContainer}>
          <p>Рекомендуем для вас</p>
        </div>
        <div>
          <ProductList
            showDiscountsOnly={false}
            isBigger={true}
            maxItems={20}
          />
        </div>
      </div>
      <div className={styles.productBlock}>
        <div className={styles.titleContainer}>
          <p>Отзывы</p>
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
