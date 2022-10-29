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
    return {
      messages: 'Successfully',
      data: { ...data, resultCode: 0 },
    };
  } catch (error) {
    console.log(error);
    return {
      messages: 'User with the same E-mail was created!',
      data: { resultCode: 1 },
    };
  }
};

module.exports = { createNewUser };
