const pool = require("../db/pool");

class LikeModel {
  static async getLikes(post_id) {
    try {
      const result = await pool.query(`
     SELECT * FROM likes WHERE post_id = '${post_id}'`);
      return result.rows;
    } catch (error) {
      return null;
    }
  }

  static async addLikes(post_id, user_id) {
    try {
      const users = this.getLikes(post_id)[0].users_id;
      users.push(user_id);
      return await pool.query(
        `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`
      );
    } catch (error) {
      return null;
    }
  }

  static async deleteLikes(post_id, user_id) {
    try {
      const users = this.getLikes(post_id)[0].users_id;
      users.filter((id) => id !== user_id);
      return await pool.query(
        `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`
      );
    } catch (error) {
      return null;
    }
  }
}

module.exports = LikeModel;
