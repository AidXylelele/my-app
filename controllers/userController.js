const UserModel = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const UserService = require('../server/service/users-service');

class UserController {
  static async createNewUser(data) {
    const id = uuidv4();
    data.password = UserService.hash(data.password);
    const newUser = await UserModel.createNewUser(data, id);
    if (!newUser) {
      return {
        messages: 'User with the same E-mail was created!',
        resultCode: 1,
      };
    }
    return {
      newUser,
      resultCode: 0,
    };
  }

  static async findUser(data) {
    const user = await UserModel.findUser(data);
    if (!user) {
      return { messages: 'User does not exist!', resultCode: 1 };
    }
    return { user, resultCode: 0 };
  }

  static async getUsers(queries) {
    const result = await UserModel.getUsers(queries);
    if (!result) {
      return { messages: 'Users does not exist!', resultCode: 1 };
    }
    return { ...result, resultCode: 0 };
  }

  static async getUserStatus(data) {
    const { status } = await UserModel.findUser(data);
    return status;
  }

  static async updateUserStatus(data, params) {
    const { id } = params;
    const { status } = data;
    const queryPart = `status = '${status}'`;
    return await UserModel.updateUser(id, queryPart, status);
  }

  static async getUserSkills(data) {
    const { skills } = await UserModel.findUser(data);
    return skills;
  }

  static async updateUserSkills(data, params) {
    const { id } = params;
    const { skills } = data;
    const queryPart = `skills = '${skills}'`;
    return await UserModel.updateUser(id, queryPart, skills);
  }
}

module.exports = UserController;
