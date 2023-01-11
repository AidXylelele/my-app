const selectors = {
  dialogsDataSelector: (state) => state.dialogsPage.dialogsData,

  messagesDataSelector: (state) => state.dialogsPage.messagesData,

  isAuthedSelector: (state) => state.auth.isAuthed,

  loginErrorSelector: (state) => state.auth.error,

  postDataSelector: (state) => state.profilePage.postsData,

  profileOfUserSelector: (state) => state.profilePage.profileOfUser,

  userStatusSelector: (state) => state.profilePage.userStatus,

  userSkillsSelector: (state) => state.profilePage.userSkills,

  usersDataSelector: (state) => state.usersPage.usersData,

  pageSizeSelector: (state) => state.usersPage.pageSize,

  totalUsersCountSelector: (state) => state.usersPage.totalUsersCount,

  selectedPageSelector: (state) => state.usersPage.selectedPage,

  isFetchingSelector: (state) => state.usersPage.isFetching,

  followRequestsSelector: (state) => state.usersPage.followRequests,

  myUserIdSelector: (state) => state.auth.userId,

  registerErrorSelector: (state) => state.register.error,
};

module.exports = selectors;
