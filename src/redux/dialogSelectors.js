const dialogsDataSelector = (state) => {
  return state.dialogsPage.dialogsData;
};

const messagesDataSelector = (state) => {
  return state.dialogsPage.messagesData;
};

const isAuthedSelector = (state) => {
  return state.auth.isAuthed;
};

export { dialogsDataSelector, messagesDataSelector, isAuthedSelector };
