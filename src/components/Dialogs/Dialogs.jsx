import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator,
} from '../../redux/state';

const Dialogs = (props) => {
  const state = props.store.getState().dialogsPage;
  const dialogsElemnts = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  const messagesElemnts = state.messagesData.map((element) => (
    <Message message={element.message} />
  ));

  const newMessageBody = state.newMessageBody;

  const onSendMessageClick = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  const onSendMessageChange = (event) => {
    const body = event.target.value;
    props.store.dispatch(updateNewMessageBodyActionCreator(body));
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
              onChange={onSendMessageChange}
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div>
            <button onClick={onSendMessageClick}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
