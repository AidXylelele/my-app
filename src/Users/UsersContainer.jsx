import React from 'react';
import axios from 'axios';
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

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.selectedPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.onSetNewUsers(response.data.items);
        this.props.onSetTotalUsersCount(response.data.totalCount);
      });
  }
  onPageChanged = (number) => {
    this.props.onSetCurrentPage(number);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${number}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.onSetNewUsers(response.data.items);
      });
  };
  render() {
    const pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    const countOfPages = [];
    for (let i = 1; i <= pagesCount; i++) {
      countOfPages.push(i);
    }
    return (
      <Users
        onPageChanged={this.onPageChanged}
        onSetCurrentPage={this.props.onSetCurrentPage}
        selectedPage={this.props.selectedPage}
        usersData={this.props.usersData}
        onFollowChange={this.props.onFollowChange}
        countOfPages={countOfPages}
      />
    );
  }
}

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);

export default UsersContainer;
