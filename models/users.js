const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const createNewUser = async (data) => {
  try {
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status) VALUES (
	 '${uuidv4()}', '${data.email}', '${data.name}', '${data.surname}', '' );
    `);
    return 'User created!';
  } catch (error) {
    return 'Fail';
  }
};

module.exports = { createNewUser };
