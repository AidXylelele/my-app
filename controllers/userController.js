const { createNewUser, findUser } = require('../models/users');
const { v4: uuidv4 } = require('uuid');

async function createNewUserController(data) {
  const id = uuidv4();
  return await createNewUser(data, id);
}

async function findUserController(data) {
  return await findUser(data);
}

module.exports = { createNewUserController, findUserController };
