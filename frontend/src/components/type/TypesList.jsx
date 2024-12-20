import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import styles from "./TypesList.module.css";
import TypeItem from "./TypeItem";
import TypeItemBigger from "./TypeItemBigger";

const TypesList = observer(({ maxTypes, isBigger = false }) => {
  const { item } = useContext(Context);

  const displayedTypes = item.types.slice(0, maxTypes);

  return (
    <div className={styles.typesList}>
      {displayedTypes.map((type) =>
        isBigger ? (
          <TypeItemBigger key={type.id} item={type} />
        ) : (
          <TypeItem key={type.id} item={type} />
        ),
      )}
    </div>
  );
});

export default TypesList;
