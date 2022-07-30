import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  const dialogsElemnts = props.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  const messagesElemnts = props.messagesData.map((element) => (
    <Message message={element.message} />
  ));

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={styles.dialog}>{dialogsElemnts}</div>
      </div>
      <div className={styles.messages}>{messagesElemnts}</div>
    </div>
  );
};

export default Dialogs;
