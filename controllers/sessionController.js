const SessionModel = require('../models/sessions');

class SessionController {
  static async setSessionToken(session, callback) {
    await SessionModel.setToken(session);
    return callback(JSON.parse(session).token);
  }

  static async getSessionToken(token, callback) {
    const result = await SessionModel.getToken(token);
    return callback(result);
  }

  static async deleteSessionToken(token, callback) {
    await SessionModel.deleteToken(token);
    return callback(token);
  }
}

module.exports = SessionController;
