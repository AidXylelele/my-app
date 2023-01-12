const pool = require('../db/pool');

const sql = {
  set: (session) => `
   UPDATE users SET token = '${
     JSON.parse(session).token
   }', data = '${session}' WHERE id = '${JSON.parse(session).id}';`,
  get: (token) => `
   SELECT token, data
    FROM users
    WHERE token='${token}'`,
  delete: (token) =>
    `UPDATE users SET token = '', data = '{}' WHERE token = '${token}';`,
};

class SessionModel {
  static async setToken(session) {
    try {
      await pool.query(sql.set(session));
    } catch (error) {
      return 'Oops! Something went wrong!';
    }
  }

  static async getToken(token) {
    try {
      const value = await pool.query(sql.get(token));
      const [object] = value.rows;
      if (object) return object.data;
    } catch (error) {
      return 'Oops! Something went wrong!';
    }
  }

  static async deleteToken(token) {
    try {
      await pool.query(sql.delete(token));
      return 'Session was destroyed!';
    } catch (error) {
      return 'Oops! Something went wrong!';
    }
  }
}

module.exports = SessionModel;
