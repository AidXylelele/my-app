import { sendMessageAction } from '../../redux/dialogsSlice';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/AuthRedirect';
import {
  dialogsDataSelector,
  isAuthedSelector,
  messagesDataSelector,
} from '../../redux/dialogSelectors';

const mapStateToProps = (state) => {
  return {
    dialogsData: dialogsDataSelector(state),
    messagesData: messagesDataSelector(state),
    isAuthed: isAuthedSelector(state),
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
