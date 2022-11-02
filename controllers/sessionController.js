const {
  setSessionToken,
  getSessionToken,
  deleteSessionToken,
} = require('../models/sessions');

async function setSessionTokenController(session, callback) {
  await setSessionToken(session);
  return callback(session.token);
}

async function getSessionTokenController(token, callback) {
  const result = await getSessionToken(token);
  return callback(result);
}

async function deleteSessionTokenController(token, callback) {
  await deleteSessionToken(token);
  return callback(token);
}

module.exports = {
  setSessionTokenController,
  getSessionTokenController,
  deleteSessionTokenController,
};
