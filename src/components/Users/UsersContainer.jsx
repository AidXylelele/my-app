import React from 'react';
import { connect } from 'react-redux';
import {
  getBlockBtnThunkCreator,
  getUsersThunkCreator,
  setCurrentPageAction,
} from '../../redux/usersSlice';
import Users from './Users';
import PreLoader from '../common/Preloader/Preloader';
import { useEffect } from 'react';
import selectors from '../../redux/selectors';
import { withAuthRedirect } from '../hoc/AuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    usersData: selectors.usersData(state),
    pageSize: selectors.pageSize(state),
    totalUsersCount: selectors.totalUsersCount(state),
    selectedPage: selectors.selectedPage(state),
    isFetching: selectors.isFetching(state),
    followRequests: selectors.followRequests(state),
    isAuthed: selectors.isAuthed(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetCurrentPage: (number) => {
      dispatch(setCurrentPageAction(number));
    },
    onGetUsers: (selectedPage, pageSize) => {
      dispatch(getUsersThunkCreator(selectedPage, pageSize));
    },
    onGetBlockBtn: (id, configName) => {
      dispatch(getBlockBtnThunkCreator(id, configName));
    },
  };
};

const UsersAPIComponent = (props) => {
  const {
    onSetCurrentPage,
    onGetUsers,
    selectedPage,
    pageSize,
    totalUsersCount,
  } = props;

  useEffect(() => {
    onGetUsers(selectedPage, pageSize);
  }, [onGetUsers, selectedPage, pageSize]);

  const onPageChanged = (number) => {
    onSetCurrentPage(number);
    onGetUsers(number, pageSize);
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
          selectedPage={props.selectedPage}
          usersData={props.usersData}
          nextPage={nextPage}
          prevPage={prevPage}
          lastPage={lastPage}
          firstPage={firstPage}
          followRequests={props.followRequests}
          onGetBlockBtn={props.onGetBlockBtn}
        />
      )}
    </>
  );
};

const UsersContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(UsersAPIComponent);

export default UsersContainer;
