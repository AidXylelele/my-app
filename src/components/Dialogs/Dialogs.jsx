import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  const dialogsData = [
    { id: 1, name: "Dima" },
    { id: 2, name: "Alex" },
    { id: 3, name: "Dasha" },
  ];

  const messagesData = [
    { id: 1, message: "Hello" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Good!" },
  ];

  const dialogsElemnts = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  const messagesElemnts = messagesData.map((element) => (
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
