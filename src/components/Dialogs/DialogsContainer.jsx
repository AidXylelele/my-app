import { sendMessage } from '../../redux/dialogsSlice';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';
import selectors from '../../redux/selectors';

const mapStateToProps = (state) => {
  return {
    dialogsData: selectors.dialogsData(state),
    messagesData: selectors.messagesData(state),
    isAuthed: selectors.isAuthed(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendNewMessage: (text) => {
      dispatch(sendMessage(text));
    },
  };
};

const DialogsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
