import { connect } from 'react-redux';
import {
  followToNewUser,
  setCurrentPage,
  setNewUsers,
  setTotalCurrentUsersCount,
} from '../redux/usersSlice';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    selectedPage: state.usersPage.selectedPage,
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
    onSetCurrentPage: (number) => {
      dispatch(setCurrentPage({ number: number }));
    },
    onSetTotalUsersCount: (number) => {
      dispatch(setTotalCurrentUsersCount({ number: number }));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
