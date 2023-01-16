import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import DialogForm from './DialogForm/DialogForm';
import { useState } from 'react';
import { useEffect } from 'react';

const Dialogs = (props) => {
  const [dialogs, setDialogs] = useState();

  useEffect(() => {}, []);
  // const dialogs = props.dialogsData.map((dialog, idx) => (
  //   <DialogItem name={dialog.name} id={dialog.id} key={idx} />
  // ));

  if (!props.isAuthed) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={styles.dialogItem}>{}</div>
      </div>
      <div className={styles.messages}>
        <div>{}</div>
        <div>
          <DialogForm onSendNewMessageClick={props.sendNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
