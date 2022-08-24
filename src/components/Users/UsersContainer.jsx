import React from 'react';
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
import { configForRequests, usersRequests } from '../../api/requestsAPI';

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
    selectedPage,
    pageSize,
    totalUsersCount,
  } = props;

  useEffect(() => {
    onSetPreLoader(true);
    usersRequests(configForRequests.usersConfig, [selectedPage, pageSize]).then(
      (response) => {
        onSetPreLoader(false);
        onSetNewUsers(response.items);
        onSetTotalUsersCount(response.totalCount);
      }
    );
  }, [
    onSetNewUsers,
    onSetPreLoader,
    onSetTotalUsersCount,
    pageSize,
    selectedPage,
  ]);

  const onPageChanged = (number) => {
    onSetCurrentPage(number);
    onSetPreLoader(true);
    usersRequests(configForRequests.usersConfig, [number, pageSize]).then(
      (response) => {
        onSetPreLoader(false);
        onSetNewUsers(response.items);
      }
    );
  };

  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  const countOfPages = [];

  for (let i = 1; i <= pagesCount; i++) {
    countOfPages.push(i);
  }

  return (
    <>
      {props.isFetching ? (
        <PreLoader />
      ) : (
        <Users
          onPageChanged={onPageChanged}
          onSetCurrentPage={props.onSetCurrentPage}
          selectedPage={props.selectedPage}
          usersData={props.usersData}
          onFollowChange={props.onFollowChange}
          countOfPages={countOfPages}
        />
      )}
    </>
  );
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersAPIComponent);

export default UsersContainer;
