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

const userSkillsSelector = (state) => {
  return state.profilePage.userSkills;
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

const registerErrorSelector = (state) => {
  return state.register.error;
};

export {
  dialogsDataSelector,
  messagesDataSelector,
  isAuthedSelector,
  loginErrorSelector,
  postDataSelector,
  profileOfUserSelector,
  userStatusSelector,
  userSkillsSelector,
  usersDataSelector,
  pageSizeSelector,
  totalUsersCountSelector,
  selectedPageSelector,
  isFetchingSelector,
  followRequestsSelector,
  myUserIdSelector,
  registerErrorSelector,
};
