import React from 'react';
import {
  sendMessage,
  updateNewMessage,
  updateNewMessageAction,
} from '../../redux/dialogsSlice';
import { useDispatch } from 'react-redux';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
  const dispatch = useDispatch();

  const stateOfDialogsPage = props.store.getState().dialogsPage;

  const sendNewMessage = () => {
    dispatch(sendMessage());
  };

  const setNewMessageChange = (text) => {
    dispatch(updateNewMessage(updateNewMessageAction({ body: text })));
  };

  return (
    <Dialogs
      sendNewMessage={sendNewMessage}
      onMessageChange={setNewMessageChange}
      state={stateOfDialogsPage}
    />
  );
};

export default DialogsContainer;
