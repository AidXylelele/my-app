const {
  createNewUser,
  findUser,
  updateUserStatus,
  getUsers,
} = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const UserService = require('../server/service/users-service');

async function createNewUserController(data) {
  const id = uuidv4();
  data.password = UserService.hash(data.password);
  return await createNewUser(data, id).then((user) => {
    if (user) {
      return {
        user,
        resultCode: 0,
      };
    }
    return {
      messages: 'User with the same E-mail was created!',
      resultCode: 1,
    };
  });
}

async function findUserController(data) {
  return await findUser(data).then((user) => {
    if (user) return { user, resultCode: 0 };
    return { messages: 'User does not exist!', resultCode: 1 };
  });
}

async function getUsersController(queries) {
  return await getUsers(queries).then((result) => {
    if (result) return { ...result, resultCode: 0 };
    return { messages: 'User does not exist!', resultCode: 1 };
  });
}

async function getUserStatusController(data) {
  const { status } = await findUser(data);
  return status;
}

async function updateUserStatusController(data, params) {
  return await updateUserStatus(data, params);
}

async function getUserSkillsController(data) {
  const { skills } = await findUser(data);
  return skills;
}

async function updateUserSkillsController(data, params) {
  return await updateUserSkills(data, params);
}


module.exports = {
  getUsersController,
  createNewUserController,
  findUserController,
  getUserStatusController,
  updateUserStatusController,
  getUserSkillsController,
  updateUserSkillsController,
};
