import { sendMessageAction } from '../../redux/dialogsSlice';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';

const mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
    isAuthed: state.auth.isAuthed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewMessage: (text) => {
      dispatch(sendMessageAction(text));
    },
  };
};

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
