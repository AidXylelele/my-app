const pool = require('../db/pool');

const sql = {
  get: (id) => `
     SELECT * FROM likes WHERE post_id = '${id}'`,
  add: (users, post_id) =>
    `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`,
  delete: (users, post_id) =>
    `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`,
};

class LikeModel {
  static async getLikes(post_id) {
    try {
      const result = await pool.query(sql.get(post_id));
      return result.rows;
    } catch (error) {
      return null;
    }
  }

  static async addLikes(post_id, user_id) {
    try {
      const users = this.getLikes(post_id)[0].users_id;
      users.push(user_id);
      return await pool.query(sql.add(users, post_id));
    } catch (error) {
      return null;
    }
  }

  static async deleteLikes(post_id, user_id) {
    try {
      const users = this.getLikes(post_id)[0].users_id;
      users.filter((id) => id !== user_id);
      return await pool.query(sql.delete(users, post_id));
    } catch (error) {
      return null;
    }
  }
}

module.exports = LikeModel;
