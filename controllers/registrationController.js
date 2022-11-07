const { findUser } = require('../models/users');
const UserService = require('../server/service/users-service');

async function authUserController(data) {
  return await findUser(data).then((response) => {
    const clientPassword = response.password || '';
    const checkedPassword = UserService.compare(data.password, clientPassword);
    if (checkedPassword) {
      return response;
    }
    return { messages: 'Invalid password or e-mail!', resultCode: 1 };
  });
}

module.exports = { authUserController };
