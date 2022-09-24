const dialogsDataSelector = (state) => {
  return state.dialogsPage.dialogsData;
};

const messagesDataSelector = (state) => {
  return state.dialogsPage.messagesData;
};

const isAuthedSelector = (state) => {
  return state.auth.isAuthed;
};

const loginErrorSelector = (state) => {
  return state.auth.error;
};

const postDataSelector = (state) => {
  return state.profilePage.postsData;
};

const profileOfUserSelector = (state) => {
  return state.profilePage.profileOfUser;
};

const userStatusSelector = (state) => {
  return state.profilePage.userStatus;
};

const usersDataSelector = (state) => {
  return state.usersPage.usersData;
};

const pageSizeSelector = (state) => {
  return state.usersPage.pageSize;
};

const totalUsersCountSelector = (state) => {
  return state.usersPage.totalUsersCount;
};

const selectedPageSelector = (state) => {
  return state.usersPage.selectedPage;
};

const isFetchingSelector = (state) => {
  return state.usersPage.isFetching;
};

const followRequestsSelector = (state) => {
  return state.usersPage.followRequests;
};

const myUserIdSelector = (state) => {
  return state.auth.userId;
};
export {
  dialogsDataSelector,
  messagesDataSelector,
  isAuthedSelector,
  loginErrorSelector,
  postDataSelector,
  profileOfUserSelector,
  userStatusSelector,
  usersDataSelector,
  pageSizeSelector,
  totalUsersCountSelector,
  selectedPageSelector,
  isFetchingSelector,
  followRequestsSelector,
  myUserIdSelector,
};
