import { sendMessage, updateNewMessage } from '../../redux/dialogsSlice';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    newMessageBody: state.dialogsPage.newMessageBody,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageChange: (text) => {
      dispatch(updateNewMessage({ body: text }));
    },
    sendNewMessage: () => {
      dispatch(sendMessage());
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
