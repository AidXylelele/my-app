const pool = require('../db/pool');
const UserService = require('../server/service/users-service');

const createNewUser = async (data, id) => {
  try {
    const { email, name, surname, password } = data;
    const hashedPassword = UserService.hash(password);
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status, password) VALUES (
	 '${id}', '${email}', '${name}', '${surname}', '', '${hashedPassword}' );
    `);
    return { id, email, name, surname, resultCode: 0 };
  } catch (error) {
    return {
      messages: 'User with the same E-mail was created!',
      resultCode: 1,
    };
  }
};

const findUser = async (dataObject) => {
  try {
    const [key] = Object.keys(dataObject).filter(
      (item) => item == 'email' || item == 'token' || item == 'id'
    );
    if (key) {
      const result = await pool.query(`
     SELECT * FROM users WHERE ${key} = '${dataObject[key]}'`);
      return { ...result.rows[0], photos: {}, resultCode: 0 };
    }
    return { messages: 'User does`t exist!', resultCode: 1 };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewUser, findUser };
