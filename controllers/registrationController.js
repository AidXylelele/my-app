const UserModel = require('../models/users');
const UserService = require('../server/service/users-service');

class RegistrationController {
  static async authUser(data) {
    const user = await UserModel.findUser(data);
    if (!user) {
      return { messages: 'Invalid password or e-mail!', resultCode: 1 };
    }
    const clientPassword = user.password || '';
    const checkedPassword = UserService.compare(data.password, clientPassword);
    if (!checkedPassword) {
      return { messages: 'Invalid password or e-mail!', resultCode: 1 };
    }
    return { user, resultCode: 0 };
  }
}

module.exports = RegistrationController;
