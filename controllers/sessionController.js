const SessionModel = require("../models/sessions");

class SessionController {
  static async setSessionTokenController(session, callback) {
    await SessionModel.setSessionToken(session);
    return callback(JSON.parse(session).token);
  }

  static async getSessionTokenController(token, callback) {
    const result = await SessionModel.getSessionToken(token);
    return callback(result);
  }

  static async deleteSessionTokenController(token, callback) {
    await SessionModel.deleteSessionToken(token);
    return callback(token);
  }
}

module.exports = SessionController;
