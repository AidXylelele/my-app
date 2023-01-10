const {
  createNewUser,
  findUser,
  updateUser,
  getUsers,
} = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const UserService = require('../server/service/users-service');

class UserControllers {
  static createNewUserController = async (data) => {
    const id = uuidv4();
    data.password = UserService.hash(data.password);
    return await createNewUser(data, id).then((user) => {
      console.log(user);
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
  };

  static findUserController = async (data) => {
    return await findUser(data).then((user) => {
      if (user) return { user, resultCode: 0 };
      return { messages: 'User does not exist!', resultCode: 1 };
    });
  };

  static getUsersController = async (queries) => {
    return await getUsers(queries).then((result) => {
      if (result) return { ...result, resultCode: 0 };
      return { messages: 'User does not exist!', resultCode: 1 };
    });
  };

  static getUserStatusController = async (data) => {
    const { status } = await findUser(data);
    return status;
  };

  static updateUserStatusController = async (data, params) => {
    const { id } = params;
    const { status } = data;
    const queryPart = `status = ${status}`;
    return await updateUser(id, queryPart, status);
  };

  static getUserSkillsController = async (data) => {
    const { skills } = await findUser(data);
    return skills;
  };

  static updateUserSkillsController = async (data, params) => {
    const { id } = params;
    const { skills } = data;
    const queryPart = `skills = ${skills}`;
    return await updateUser(id, queryPart, skills);
  };
}

module.exports = {
  UserControllers,
};
