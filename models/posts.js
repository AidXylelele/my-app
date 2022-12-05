const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getPosts = async (user_id) => {
  try {
    const result = await pool.query(`
     SELECT * FROM posts WHERE user_id = '${user_id}'`);
    return result.rows;
  } catch (error) {
    console.log(error);
    return {
      messages: 'User with the same E-mail was created!',
      resultCode: 1,
    };
  }
};

const createPost = async (message, user_id) => {
  try {
    console.log(message);
    const post_id = uuidv4();
    await pool.query(`
    INSERT INTO posts(
	user_id, post_id, message) VALUES (
	 '${user_id}', '${post_id}', '${message}' );
    `);
    return { post: { post_id, message }, resultCode: 0 };
  } catch (error) {
    console.log(error);
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

const updateUserStatus = async (dataObject, { id }) => {
  try {
    const { status } = dataObject;
    await pool.query(
      ` UPDATE users SET status = '${status}' WHERE id = '${id}';`
    );
    return { status, resultCode: 0 };
  } catch (error) {
    console.log(error);
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

module.exports = { getPosts, createPost };
