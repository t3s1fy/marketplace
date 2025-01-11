import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/CreateFeedback.module.css";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../index";
import StarRating from "../components/star_rating/StarRating";
import camera from "../assets/icons/camera.svg";
import crossMicro from "../assets/icons/crossMicro.svg";

const EditFeedback = observer(() => {
  const { item } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  console.log(anonymous);

  const [product, setProduct] = useState(null); // Добавляем состояние для товара
  const [images, setImages] = useState([]); // Состояние для изображений

  const [currentItem, setCurrentItem] = useState(0);

  const formatDate = (date) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const currentDate = new Date(); // Получаем текущую дату
  const formattedDate = formatDate(currentDate); // Форматируем её

  useEffect(() => {
    const foundFeedback = item.getFeedbackById(parseInt(id));
    if (foundFeedback) {
      setFeedback(foundFeedback);
      setRating(foundFeedback.rating);
      setContent(foundFeedback.content);
      setAnonymous(foundFeedback.anonymous || false);
      const foundProduct = item.items.find(
        (product) => product.id === foundFeedback.productId,
      );
      setProduct(foundProduct);
      setImages(foundFeedback.images || []);
    } else {
      alert("Отзыв не найден!");
      navigate(-1);
    }
  }, [id, navigate, item.items]);

  const handleSave = () => {
    const updatedFeedback = item.feedback.map((fb) =>
      fb.id === feedback.id
        ? {
            ...fb,
            rating,
            content,
            anonymous,
            images,
            status: "На модерации",
            date: formattedDate,
          }
        : fb,
    );

    item.setFeedback(updatedFeedback);

    // Сохранение в localStorage
    localStorage.setItem("feedback", JSON.stringify(updatedFeedback));

    navigate(-1); // Возвращение назад
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...uploadedFiles]);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click(); // Имитируем клик по скрытому инпуту
  };

  const handleImageRemove = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleToggle = () => {
    setAnonymous((prev) => !prev); // Переключает между true и false
  };

  if (!feedback || !product) return <div>Загрузка...</div>;

  return (
    <div className={styles.feedbackPage}>
      <div className={styles.mainContainer}>
        <div className={styles.mainHeader}>
          <img src={product.img} alt="" />
          <p>{product.name}</p>
        </div>
        <div className={styles.ratingContainer}>
          <StarRating
            currentItem={rating}
            setCurrentItem={setRating}
            bigger={true}
          />
        </div>
        <p className={styles.description}>
          Отредактированный отзыв отправится на модерацию и<br />
          станет временно недоступен для других пользователей.
        </p>
        <p className={styles.title}>Добавьте фото</p>

        <div className={styles.imageUploadBlock}>
          {!images.length ? (
            <div className={styles.uploadArea} onClick={handleClick}>
              <input
                type="file"
                multiple
                accept="image/*"
                id="fileInput"
                onChange={handleImageUpload}
                className={styles.fileInput}
              />
              <img src={camera} alt="cameraIcon" />
              <p>загрузите не более 8 файлов</p>
            </div>
          ) : (
            <div className={styles.previewArea}>
              <button className={styles.loadImageBtn} onClick={handleClick}>
                <img src={camera} alt="cameraIcon" />
              </button>
              <div className={styles.previewImages}>
                {images.map((image, index) => (
                  <div key={index} className={styles.previewImageWrapper}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Фото ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      className={styles.deleteImageBtn}
                      onClick={() => handleImageRemove(index)}
                    >
                      <img src={crossMicro} alt="Cross" />
                    </button>
                  </div>
                ))}
              </div>
              {images.length < 8 && (
                <input
                  type="file"
                  multiple
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
              )}
            </div>
          )}
        </div>

        <p className={styles.title}>Опишите общие впечатления о товаре</p>
        <textarea className={styles.inputBlock} />

        <div className={styles.anonBlock}>
          <p>Сделать отзыв анонимным</p>
          <button
            className={`${styles.toggleBtn} ${anonymous ? styles.toggled : ""}`}
            onClick={handleToggle}
          >
            <div className={styles.thumb}></div>
          </button>
        </div>

        <button className={styles.saveBtn} onClick={handleSave}>
          Отправить отзыв
        </button>
      </div>
    </div>
  );
});

export default EditFeedback;
