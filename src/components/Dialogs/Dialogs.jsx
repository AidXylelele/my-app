import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {
  sendMessage,
  updateNewMessage,
  updateNewMessageAction,
} from '../../redux/dialogsSlice';
import { useDispatch } from 'react-redux';

const Dialogs = (props) => {
  const dispatch = useDispatch();
  const state = props.store.getState().dialogsPage;
  const dialogsElemnts = state.dialogsData.map((dialog, idx) => (
    <DialogItem name={dialog.name} id={dialog.id} key={idx} />
  ));
  const messagesElemnts = state.messagesData.map((element, idx) => (
    <Message message={element.message} key={idx} />
  ));

  const newMessageBody = state.newMessageBody;

  const onSendMessageChange = (event) => {
    const body = event.target.value;
    dispatch(updateNewMessage(updateNewMessageAction(body)));
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
            <button onClick={()=> {dispatch(sendMessage())}}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
