const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const sql = {
  getAll: (id) => `
     SELECT * FROM posts WHERE user_id = '${id}'`,
  getById: (post_id) => `SELECT * FROM posts WHERE post_id = '${post_id}';`,
  update: ({ message, date, post_id }) =>
    `UPDATE posts SET message = '${message}', post_date = '${date}' WHERE post_id = '${post_id}';`,
  create: ({ user_id, like_id, post_id, message, date }) => `
    INSERT INTO posts(
	user_id, post_id, message, post_date) VALUES (
	 '${user_id}', '${post_id}', '${message}', '${date}');
   INSERT INTO likes(id, post_id, users_id) VALUES(
    '${like_id}', '${post_id}', '{}'
   );
    `,
  delete: (id) => `DELETE FROM likes WHERE post_id = '${id}';
      DELETE FROM posts WHERE post_id = '${id}';`,
};

class PostModel {
  static async getPosts(user_id) {
    try {
      const result = await pool.query(sql.getAll(user_id));
      return result.rows;
    } catch (error) {
      return null;
    }
  }

  static async updatePost(message, post_id, date) {
    try {
      return await pool.query(sql.update({ message, post_id, date }));
    } catch (error) {
      return null;
    }
  }

  static async createPost(message, user_id, date) {
    try {
      const post_id = uuidv4();
      const like_id = uuidv4();
      await pool.query(
        sql.create({ user_id, like_id, post_id, message, date })
      );
      const newPost = await pool.query(sql.getById(post_id));

      return { ...newPost.rows[0] };
    } catch (error) {
      return null;
    }
  }

  static async deletePost(id) {
    try {
      return await pool.query(sql.delete(id));
    } catch (error) {
      return null;
    }
  }
}

module.exports = PostModel;
