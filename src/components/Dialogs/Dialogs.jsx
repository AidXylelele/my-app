import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  const dialogsElemnts = props.dialogsData.map((dialog, idx) => (
    <DialogItem name={dialog.name} id={dialog.id} key={idx} />
  ));

  const messagesElemnts = props.messagesData.map((element, idx) => (
    <Message message={element.message} key={idx} />
  ));

  const onSendNewMessageClick = () => {
    props.sendNewMessage();
  };

  const controllerOfTextArea = (event) => {
    const text = event.target.value;
    props.onMessageChange(text);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        <div className={styles.dialogItem}>{dialogsElemnts}</div>
      </div>
      <div className={styles.messages}>
        <div>{messagesElemnts}</div>
        <div>
          <div>
            <textarea
              value={props.newMessageBody}
              onChange={controllerOfTextArea}
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div>
            <button onClick={onSendNewMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
