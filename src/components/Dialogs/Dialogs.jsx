import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import DialogForm from './DialogForm/DialogForm';

const Dialogs = (props) => {
  const dialogsElemnts = props.dialogsData.map((dialog, idx) => (
    <DialogItem name={dialog.name} id={dialog.id} key={idx} />
  ));

  const messagesElemnts = props.messagesData.map((element, idx) => (
    <Message message={element.message} key={idx} />
  ));

  if (!props.isAuthed) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={styles.dialogItem}>{dialogsElemnts}</div>
      </div>
      <div className={styles.messages}>
        <div>{messagesElemnts}</div>
        <div>
          <DialogForm onSendNewMessageClick={props.sendNewMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
