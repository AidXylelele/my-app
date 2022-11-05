const bcrypt = require('bcryptjs');

class UserService {
  constructor() {}
  static hash(data) {
    const salt = bcrypt.genSaltSync(3);
    return bcrypt.hashSync(data, salt);
  }
  static compare(reqData, resData) {
    return bcrypt.compareSync(reqData, resData);
  }
}

module.exports = UserService;
