import {
  sendMessageAction,
  updateNewMessageAction,
} from '../../redux/dialogsSlice';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';

const mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    newMessageBody: state.dialogsPage.newMessageBody,
    isAuthed: state.auth.isAuthed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageChange: (text) => {
      dispatch(updateNewMessageAction(text));
    },
    sendNewMessage: () => {
      dispatch(sendMessageAction());
    },
  };
};

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
