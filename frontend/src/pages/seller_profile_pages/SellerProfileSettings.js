import React from "react";
import { observer } from "mobx-react-lite";
import SellerProfileContainer from "../../components/profile_container/SellerProfileContainer";
import s from "../../styles/seller_profile_pages_styles/SellerProfileSettings.module.css";
import line from "../../assets/seller_profile_assets/line_image.png";

const SellerProfileSettings = observer(() => {
  return (
    <div className={s.profilePage}>
      <SellerProfileContainer />
      <div className={s.container}>
        <img src={line} alt="line" />
        <div className={s.main}>
          <div className={s.mainMain}>
            <div className={s.mainHeader}>
              <p>Настройки</p>
            </div>
            <div className={s.settingsBlock}>
              <div className={s.titleBlock}>
                <p className={s.title}>Реквизиты</p>
                <p className={s.subTitle}>
                  Здесь вы можете добавить свои реквизиты для получения <br />{" "}
                  денежной суммы с продажи товаров.
                </p>
              </div>
              <div className={s.mainBlock}>
                <div className={s.leftBlock}>
                  <div className={s.inputBlock}>
                    <p className={s.inputTitle}>
                      Расчётный счёт{" "}
                      <span>
                        (состоит из <span>20 цифр</span>)
                      </span>
                    </p>
                    <input
                      className={s.inputPlace}
                      type="number"
                      maxLength={20}
                    />
                    <p className={s.inputSubTitle}>
                      Введите в поле номер банковского счёта, открытый вами или
                      компанией
                      <br />в конкретном банке. Внимательно проверьте
                      правильность заполнения!
                    </p>
                  </div>
                  <div className={s.inputBlock}>
                    <p className={s.inputTitle}>
                      Корреспондентский счёт{" "}
                      <span>
                        (состоит из <span>20 цифр</span>)
                      </span>
                    </p>
                    <input
                      className={s.inputPlace}
                      type="number"
                      maxLength={20}
                    />
                    <p className={s.inputSubTitle}>
                      Корреспондентский счёт заканчивается тремя последними
                      цифрами БИК.
                    </p>
                  </div>
                </div>
                <div className={s.rightBlock}>
                  <div className={s.inputBlock}>
                    <p className={s.inputTitle}>
                      БИК{" "}
                      <span>
                        (состоит из <span>9 цифр</span>)
                      </span>
                    </p>
                    <input
                      className={s.inputPlace}
                      type="number"
                      maxLength={9}
                    />
                    <p className={s.inputSubTitle}>
                      Введите в поле банковский идентификационный код.
                    </p>
                  </div>
                  <div className={s.inputBlock}>
                    <p className={s.inputTitle}>Полное название банка</p>
                    <input className={s.inputPlace} type="text" />
                    <p className={s.inputSubTitle}>
                      Из выпадающего списка выберите имя вашего банка.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SellerProfileSettings;
