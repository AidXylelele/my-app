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
    console.log(error);
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
      if (result.rows[0] !== []) {
        return { ...result.rows[0], photos: {}, resultCode: 0 };
      }
      return { messages: 'User does`t exist!', resultCode: 1 };
    }
  } catch (error) {
    console.log(error);
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

const updateUserStatus = async (dataObject, params) => {
  try {
    const { id } = params;
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

module.exports = { createNewUser, findUser, updateUserStatus };
