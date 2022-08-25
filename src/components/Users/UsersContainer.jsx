import React from 'react';
import { connect } from 'react-redux';
import {
  followToNewUser,
  setBlockOfButtons,
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
    followRequests: state.usersPage.followRequests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowChange: (id) => {
      dispatch(followToNewUser({ id }));
    },
    onSetNewUsers: (users) => {
      dispatch(setNewUsers({ users }));
    },
    onSetCurrentPage: (number) => {
      dispatch(setCurrentPage({ number }));
    },
    onSetTotalUsersCount: (number) => {
      dispatch(setTotalCurrentUsersCount({ number }));
    },
    onSetPreLoader: (flag) => {
      dispatch(setPreLoader({ flag }));
    },
    onSetBlockButtons: (id, flag) => {
      dispatch(setBlockOfButtons({ id, flag }));
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

  const nextPage = (pageNumber) => {
    if (pageNumber === pagesCount) return;
    let nextPage = ++pageNumber;
    onPageChanged(nextPage);
  };

  const prevPage = (pageNumber) => {
    if (pageNumber === 1) return;
    const nextPage = --pageNumber;
    onPageChanged(nextPage);
  };

  const lastPage = () => {
    const nextPage = pagesCount;
    if (selectedPage === nextPage) return;
    onPageChanged(nextPage);
  };

  const firstPage = () => {
    const nextPage = 1;
    if (selectedPage === nextPage) return;
    onPageChanged(nextPage);
  };
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
          pagesCount={pagesCount}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          firstPage={firstPage}
          followRequests={props.followRequests}
          isFetching={props.isFetching}
          onSetBlockButtons={props.onSetBlockButtons}
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
