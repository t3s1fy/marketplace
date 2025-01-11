import React, { useContext, useEffect, useState } from "react";
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

  const [mainImage, setMainImage] = useState(product.img);

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomActive, setIsZoomActive] = useState(false);

  if (!product) {
    return <div className={styles.productPage}>Товар не найден</div>;
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Процент по X
    const y = ((e.clientY - top) / height) * 100; // Процент по X
    setZoomPosition({ x, y });
  };

  const handleMouseZoomEnter = () => {
    setIsZoomActive(true);
  };

  const handleMouseZoomLeave = () => {
    setIsZoomActive(false);
  };

  const handleAddToCart = () => {
    item.addToBasket(product.id);
  };

  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  const differencePrice = product.price - discountedPrice;

  const handleMouseEnter = (image) => {
    setMainImage(image);
  };
  // Логика доступности товара
  let availability;
  if (product.count === 0) {
    availability = "Нет в наличии";
  } else if (product.count < 10) {
    availability = "Осталось мало";
  } else {
    availability = "Есть";
  }

  useEffect(() => {
    // Прокручиваем страницу вверх при монтировании компонента
    window.scrollTo(0, 0);

    // Если компонент обновляется, например, при изменении зависимостей, также прокручиваем вверх
    // Это необходимо только в случае, если компонент может обновляться без полного монтирования
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.headerBlock}>
        <div className={styles.titleBlock}>
          <Link to={-1} className={styles.arrowBtn}>
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
            <div className={styles.productPictureMini}>
              <img
                src={product.img}
                alt="картинка"
                onMouseEnter={() => handleMouseEnter(product.img)}
              />
            </div>
            <div className={styles.productPictureMini}>
              <img
                src="https://avatars.mds.yandex.net/i?id=7aef89e819bd5790a829e9a58d4e5e82_l-12922404-images-thumbs&n=13"
                alt=""
                onMouseEnter={() =>
                  handleMouseEnter(
                    "https://avatars.mds.yandex.net/i?id=7aef89e819bd5790a829e9a58d4e5e82_l-12922404-images-thumbs&n=13",
                  )
                }
              />
            </div>
            <div className={styles.productPictureMini}>
              <img
                src="https://i.pinimg.com/originals/81/7b/58/817b5854efcedcfcbd4a7dad6d25b7ce.jpg"
                alt=""
                onMouseEnter={() =>
                  handleMouseEnter(
                    "https://i.pinimg.com/originals/81/7b/58/817b5854efcedcfcbd4a7dad6d25b7ce.jpg",
                  )
                }
              />
            </div>
            <div className={styles.productPictureMini}>
              <img
                src="https://api.energocontract.ru/upload/medialibrary/261/BOP2.png"
                alt=""
                onMouseEnter={() =>
                  handleMouseEnter(
                    "https://api.energocontract.ru/upload/medialibrary/261/BOP2.png",
                  )
                }
              />
            </div>
          </div>
          <div
            className={styles.productPicture}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseZoomEnter}
            onMouseLeave={handleMouseZoomLeave}
          >
            <img src={mainImage} alt="картинка" />
            {/* Зум картинки */}
            {isZoomActive && (
              <div
                className={styles.zoom}
                style={{
                  backgroundImage: `url(${mainImage})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}% `,
                }}
              ></div>
            )}
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
