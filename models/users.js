const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const createNewUser = async (data) => {
  try {
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status, password) VALUES (
	 '${uuidv4()}', '${data.email}', '${data.name}', '${data.surname}', '', '${
      data.password
    }' );
    `);
    return data;
  } catch (error) {
    return 'User with the same E-mail was created!';
  }
};

const findUser = async (data) => {
  try {
    const result = await pool.query(`
     SELECT * FROM users WHERE email = '${data.email}'`);
    return result.rows[0];
  } catch (error) {
    return 'User does`t exist!';
  }
};

const findUserByToken = async (cookie) => {
  try {
    const result = await pool.query(`
     SELECT * FROM users WHERE token = '${cookie.token}'`);
    return { messages: '', data: { ...result.rows[0], resultCode: 0 } };
  } catch (error) {
    return 'User does`t exist!';
  }
};

module.exports = { createNewUser, findUser, findUserByToken };
