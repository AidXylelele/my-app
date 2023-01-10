const crypto = require('node:crypto');

class UserService {
  constructor() {}
  static hash(data) {
    return crypto.scryptSync(data, 'salt', 64).toString('hex');
  }
  static compare(reqData, resData) {
    enteredPass = crypto.scryptSync(reqData, 'salt', 64).toString('hex');
    return enteredPass === resData;
  }
}

module.exports = UserService;
