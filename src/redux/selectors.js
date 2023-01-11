const selectors = {
  dialogsData: (state) => state.dialogsPage.dialogsData,

  messagesData: (state) => state.dialogsPage.messagesData,

  isAuthed: (state) => state.auth.isAuthed,

  loginError: (state) => state.auth.error,

  postData: (state) => state.profilePage.postsData,

  profileOfUser: (state) => state.profilePage.profileOfUser,

  userStatus: (state) => state.profilePage.userStatus,

  userSkills: (state) => state.profilePage.userSkills,

  usersData: (state) => state.usersPage.usersData,

  pageSize: (state) => state.usersPage.pageSize,

  totalUsersCount: (state) => state.usersPage.totalUsersCount,

  selectedPage: (state) => state.usersPage.selectedPage,

  isFetching: (state) => state.usersPage.isFetching,

  followRequests: (state) => state.usersPage.followRequests,

  myUserId: (state) => state.auth.userId,

  registerError: (state) => state.register.error,
};
export default selectors;
