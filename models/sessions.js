const pool = require("../db/pool");

class SessionModel {
  static async setSessionToken(session) {
    try {
      await pool.query(`
   UPDATE users SET token = '${
     JSON.parse(session).token
   }', data = '${session}' WHERE id = '${JSON.parse(session).id}';`);
    } catch (error) {
      return "Oops! Something went wrong!";
    }
  }

  static async getSessionToken(token) {
    try {
      const value = await pool.query(`
   SELECT token, data
    FROM users
    WHERE token='${token}'`);
      const [object] = value.rows;
      if (object) return object.data;
    } catch (error) {
      return "Oops! Something went wrong!";
    }
  }

  static async deleteSessionToken(token) {
    try {
      await pool.query(
        `UPDATE users SET token = '', data = '{}' WHERE token = '${token}';`
      );
      return "Session was destroyed!";
    } catch (error) {
      return "Oops! Something went wrong!";
    }
  }
}

module.exports = SessionModel;
