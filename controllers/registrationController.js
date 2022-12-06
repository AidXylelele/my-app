const { findUser } = require('../models/users');
const UserService = require('../server/service/users-service');

async function authUserController(data) {
  return await findUser(data).then((user) => {
    const clientPassword = user.password || '';
    const checkedPassword = UserService.compare(data.password, clientPassword);
    if (checkedPassword) {
      return { user, resultCode: 0 };
    }
    return { messages: 'Invalid password or e-mail!', resultCode: 1 };
  });
}

module.exports = { authUserController };
