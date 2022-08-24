import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  followToNewUser,
  setCurrentPage,
  setNewUsers,
  setPreLoader,
  setTotalCurrentUsersCount,
} from '../../redux/usersSlice';
import Users from './Users';
import PreLoader from '../common/Preloader/Preloader';
import { useEffect } from 'react';

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    selectedPage: state.usersPage.selectedPage,
    isFetching: state.usersPage.isFetching,
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
    onSetPreLoader: (boolean) => {
      dispatch(setPreLoader({ flag: boolean }));
    },
  };
};

const UsersAPIComponent = (props) => {
  const {
    onSetPreLoader,
    onSetNewUsers,
    onSetTotalUsersCount,
    onSetCurrentPage,
  } = props;

  useEffect(() => {
    onSetPreLoader(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${props.selectedPage}&count=${props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        onSetPreLoader(false);
        onSetNewUsers(response.data.items);
        onSetTotalUsersCount(response.data.totalCount);
      });
  }, [onSetNewUsers, onSetPreLoader, onSetTotalUsersCount]);

  const onPageChanged = (number) => {
    onSetCurrentPage(number);
    onSetPreLoader(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${number}&count=${props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        onSetPreLoader(false);
        onSetNewUsers(response.data.items);
      });
  };

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  const countOfPages = [];

  for (let i = 1; i <= pagesCount; i++) {
    countOfPages.push(i);
  }

  return (
    <>
      {props.isFetching ? <PreLoader /> : null}
      <Users
        onPageChanged={onPageChanged}
        onSetCurrentPage={props.onSetCurrentPage}
        selectedPage={props.selectedPage}
        usersData={props.usersData}
        onFollowChange={props.onFollowChange}
        countOfPages={countOfPages}
      />
    </>
  );
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);

export default UsersContainer;
