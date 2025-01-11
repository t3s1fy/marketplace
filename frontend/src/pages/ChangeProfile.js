import React, { useState } from "react";

import line from "../assets/icons/headerImageBigger.png";
import logo from "../assets/icons/changeProfileIcon.svg";
import pen from "../assets/icons/changeProfilePen.svg";
import basket from "../assets/icons/changeProfileBasket.svg";
import styles from "../styles/ChangeProfile.module.css";

import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../utils/consts";
import ModalExitUser from "../components/modal_window/ModalExitUser";

const ChangeProfile = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const [avatar, setAvatar] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [passwordModalActive, setPasswordModalActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(null);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <img src={line} alt="headerImage" />
          <div className={styles.headerInfoBlock}>
            <div className={styles.headerTitle}>
              <img src={logo} alt="logo" />
              <span>Управление профилем</span>
            </div>
            <button onClick={() => navigate(PROFILE_ROUTE)}>
              Вернуться в личный кабинет
            </button>
          </div>
        </div>

        <di1v className={styles.mainContainer}>
          <div className={styles.settingsContainer}>
            <p className={styles.settingsTitle}>Общие настройки</p>
            <p
              className={styles.settingsDescription}
            >{`Здесь вы можете изменять публичную информацию о себе.\nЭта информация отобразится в профиле.`}</p>
            <div className={styles.inputLockedBlock}>
              <p className={styles.inputBlockTitle}>Почта</p>
              <div className={styles.inputLocked}>vladimir.putin@mail.ru</div>
              <p
                className={styles.inputBlockDescription}
              >{`Ваш аккаунт привязан к указанной почте.
Вы не можете её изменить.`}</p>
            </div>
            <div className={styles.inputBlock}>
              <p className={styles.inputBlockTitle}>Отображаемое имя</p>
              <input type="text" className={styles.inputOn}></input>
              <p
                className={styles.inputBlockDescription}
              >{`Здесь вы можете ввести имя, которое будет\nотображаться в вашем профиле.`}</p>
            </div>
            <p className={styles.settingsTitle}>Дополнительно</p>
            <p
              className={styles.settingsDescription}
            >{`Также вы можете заполнить данные о себе.\nЭта информация не отобразится в профиле.`}</p>
            <div className={styles.inputBlock}>
              <p className={styles.inputBlockTitle}>Имя</p>
              <input type="text" className={styles.inputOn}></input>
            </div>

            <div className={styles.inputBlock}>
              <p className={styles.inputBlockTitle}>Фамилия</p>
              <input type="text" className={styles.inputOn}></input>
            </div>

            <div className={styles.inputBlock}>
              <p className={styles.inputBlockTitle}>Отчество</p>
              <input type="text" className={styles.inputOn}></input>
            </div>

            <button className={styles.saveBtn}>Сохранить изменения</button>
          </div>
          <div className={styles.otherSettingsContainer}>
            <div className={styles.changePasswordContainer}>
              <p className={styles.settingsTitle}>Сменить пароль</p>
              <p
                className={styles.settingsDescription}
              >{`После подтверждения смены пароля ваш старый пароль
потеряет актуальность.`}</p>

              <div className={styles.inputBlock}>
                <p className={styles.inputBlockTitle}>Текущий пароль</p>
                <input type="password" className={styles.inputOn}></input>
                <p
                  className={styles.inputBlockDescription}
                >{`Введите ваш старый (текущий) пароль.`}</p>
              </div>

              <div className={styles.inputBlock}>
                <p className={styles.inputBlockTitle}>Новый пароль</p>
                <input type="password" className={styles.inputOn}></input>
                <p
                  className={styles.inputBlockDescription}
                >{`Введите ваш новый пароль.`}</p>
              </div>

              <div className={styles.inputBlock}>
                <p className={styles.inputBlockTitle}>Подтверждение пароля</p>
                <input type="password" className={styles.inputOn}></input>
                <p
                  className={styles.inputBlockDescription}
                >{`Введите ваш новый пароль повторно.`}</p>
              </div>

              <button
                className={styles.saveChangePassword}
                onClick={() => setPasswordModalActive(true)}
              >
                Сменить пароль
              </button>
            </div>
            <div className={styles.changePickPointContainer}>
              <p className={styles.settingsTitle}>Пункт выдачи заказов (ПВЗ)</p>
              <p
                className={styles.settingsDescription}
              >{`Здесь вы можете указать пункт выдачи заказов (ПВЗ), в котором вам будет удобно получить заказ.`}</p>

              <div className={styles.inputBlock}>
                <p className={styles.inputBlockTitle}>Пункт выдачи заказов</p>
                <input type="text" className={styles.inputOn}></input>
                <p
                  className={styles.inputBlockDescription}
                >{`Выберите пункт выдачи заказов из выпадающего списка.`}</p>

                <button className={styles.saveBtn}>
                  Сохранить пункт выдачи
                </button>
              </div>
            </div>
          </div>
          <div className={styles.changePhotoContainer}>
            <p className={styles.settingsTitle}>Изменить фотографию (аватар)</p>
            <p
              className={styles.changeAvatarDesription}
            >{`Здесь вы можете выбрать фотографию,\nкоторая будет отображаться в вашем\nпрофиле.`}</p>
            <div className={styles.avatarBlock}>
              <div
                className={styles.avatar}
                style={{
                  backgroundColor: avatar
                    ? "transparent"
                    : "rgba(223, 189, 169, 1)",
                }}
              >
                {avatar ? (
                  <img className={styles.imgAvatar} src={avatar} alt="avatar" />
                ) : (
                  <span className={styles.textAvatar}>ZV</span>
                )}

                <label className={styles.changeAvatarLabel} htmlFor="fileInput">
                  <img src={pen} alt="edit" />
                </label>
                {avatar ? (
                  <button
                    className={styles.deleteButton}
                    onClick={() => setModalActive(true)}
                    // onClick={handleDeleteAvatar}
                  >
                    <img src={basket} alt="basket" />
                  </button>
                ) : (
                  <button className={`${styles.deleteButton} ${styles.block}`}>
                    <img src={basket} alt="basket" />
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
            </div>

            <button className={`${styles.saveBtn} ${styles.saveAvatar}`}>
              Сохранить фотографию
            </button>
          </div>
        </di1v>
      </div>
      <ModalExitUser
        active={modalActive}
        setActive={setModalActive}
        second={false}
        title={"Вы точно хотите\nудалить текущую фотографию?"}
        subtitle={"после подтверждения фотография\n" + "исчезнет"}
        confirm={"Да, удалить"}
        action={"deleteAvatar"}
        onConfirm={handleDeleteAvatar}
      ></ModalExitUser>
      <ModalExitUser
        active={passwordModalActive}
        setActive={setPasswordModalActive}
        second={true}
        title={
          "Введите код подтверждения, который придёт\n" +
          "на ваш электронный адрес в течение пяти минут!"
        }
        subtitle={"после подтверждения фотография\n" + "исчезнет"}
        confirm={"Да, удалить"}
        action={"deleteAvatar"}
        onConfirm={handleDeleteAvatar}
      ></ModalExitUser>
    </div>
  );
});

export default ChangeProfile;
