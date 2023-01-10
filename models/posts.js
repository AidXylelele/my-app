const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getPosts = async (user_id) => {
  try {
    const result = await pool.query(`
     SELECT * FROM posts WHERE user_id = '${user_id}'`);
    return result.rows;
  } catch (error) {
    return null;
  }
};

const updatePost = async (message, post_id, date) => {
  try {
    return await pool.query(
      `UPDATE posts SET message = '${message}', post_date = '${date}' WHERE post_id = '${post_id}';`
    );
  } catch (error) {
    return null;
  }
};

const createPost = async (message, user_id, date) => {
  try {
    const post_id = uuidv4();
    const like_id = uuidv4();
    await pool.query(`
    INSERT INTO posts(
	user_id, post_id, message, post_date) VALUES (
	 '${user_id}', '${post_id}', '${message}', '${date}');
   INSERT INTO likes(id, post_id, users_id) VALUES(
    '${like_id}', '${post_id}', '{}'
   );
    `);
    return { post_id, message, date };
  } catch (error) {
    return null;
  }
};

const deletePost = async (id) => {
  try {
    return await pool.query(
      `DELETE FROM likes WHERE post_id = '${id}';
      DELETE FROM posts WHERE post_id = '${id}';`
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost };
