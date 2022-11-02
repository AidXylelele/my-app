const { findUser } = require('../models/users');

async function authUserController(data) {
  return await findUser(data).then((response) => {
    if (data.password == response.password) {
      return response;
    }
  });
}

module.exports = { authUserController };
