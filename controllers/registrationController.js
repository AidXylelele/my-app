const { findUser } = require('../models/users');
const UserService = require('../server/service/users-service');

async function authUserController(data) {
  return await findUser(data).then((user) => {
    const clientPassword = user.password || '';
    const checkedPassword = UserService.compare(clientPassword, data.password);
    if (checkedPassword) {
      return { user, resultCode: 0 };
    }
    return { messages: 'Invalid password or e-mail!', resultCode: 1 };
  });
}

module.exports = { authUserController };
