const {
  createNewUser,
  findUser,
  updateUserStatus,
} = require('../models/users');
const { v4: uuidv4 } = require('uuid');

async function createNewUserController(data) {
  const id = uuidv4();
  return await createNewUser(data, id);
}

async function findUserController(data) {
  return await findUser(data);
}

async function getUserStatusController(data) {
  const { status } = await findUser(data);
  return status;
}

async function updateUserStatusController(data, params) {
  return await updateUserStatus(data, params);
}

module.exports = {
  createNewUserController,
  findUserController,
  getUserStatusController,
  updateUserStatusController,
};
