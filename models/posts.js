const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getPosts = async (user_id) => {
  try {
    const result = await pool.query(`
     SELECT * FROM posts WHERE user_id = '${user_id}'`);
    return result.rows;
  } catch (error) {
    return error;
  }
};

const createPost = async (message, user_id) => {
  try {
    const post_id = uuidv4();
    await pool.query(`
    INSERT INTO posts(
	user_id, post_id, message) VALUES (
	 '${user_id}', '${post_id}', '${message}' );
    `);
    return { post_id, message };
  } catch (error) {
    return error;
  }
};

module.exports = { getPosts, createPost };
