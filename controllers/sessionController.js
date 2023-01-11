const SessionModel = require("../models/sessions");

class SessionController {
  static async setSessionToken(session, callback) {
    await SessionModel.setSessionToken(session);
    return callback(JSON.parse(session).token);
  }

  static async getSessionToken(token, callback) {
    const result = await SessionModel.getSessionToken(token);
    return callback(result);
  }

  static async deleteSessionToken(token, callback) {
    await SessionModel.deleteSessionToken(token);
    return callback(token);
  }
}

module.exports = SessionController;
