import React from "react";
import styles from "./Dialogs.module.css";

const Dialogs = (props) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={`${styles.dialog} ${styles.active}`}>Dima</div>
        <div className={styles.dialog}>Alex</div>
        <div className={styles.dialog}>Vadim</div>
      </div>
      <div className={styles.messages}>
        <div className={styles.message}>Hello!</div>
        <div className={styles.message}>How are you?</div>
        <div className={styles.message}>Lol</div>
      </div>
    </div>
  );
};

export default Dialogs;

