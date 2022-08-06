import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
  const dialogsElemnts = props.state.dialogsData.map((dialog, idx) => (
    <DialogItem name={dialog.name} id={dialog.id} key={idx} />
  ));

  const messagesElemnts = props.state.messagesData.map((element, idx) => (
    <Message message={element.message} key={idx} />
  ));

  const newMessageBody = props.state.newMessageBody;

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
        <div className={styles.dialog}>{dialogsElemnts}</div>
      </div>
      <div className={styles.messages}>
        <div>{messagesElemnts}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
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
