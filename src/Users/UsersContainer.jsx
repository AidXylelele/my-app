import { connect } from 'react-redux';
import { followToNewUser, setNewUsers } from '../redux/usersSlice';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowChange: (idOfPerson) => {
      dispatch(followToNewUser({ id: idOfPerson }));
    },
    onSetNewUsers: (users) => {
      dispatch(setNewUsers({ users: users }));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
