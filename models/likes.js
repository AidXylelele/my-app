const pool = require('../db/pool');

const getLikes = async (post_id) => {
  try {
    const result = await pool.query(`
     SELECT * FROM likes WHERE post_id = '${post_id}'`);
    return result.rows;
  } catch (error) {
    return null;
  }
};

const addLikes = async (post_id, user_id) => {
  try {
    const users = getLikes(post_id).users_id;
    users.push(user_id);
    return await pool.query(
      `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`
    );
  } catch (error) {
    return null;
  }
};

const deleteLikes = async (post_id, user_id) => {
  try {
    const users = getLikes(post_id).users_id;
    users.filter((id) => id !== user_id);
    return await pool.query(
      `UPDATE likes SET users_id = {${users}} WHERE post_id = '${post_id}';`
    );
  } catch (error) {
    return null;
  }
};

module.exports = { getLikes, addLikes, deleteLikes };
