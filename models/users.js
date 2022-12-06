const pool = require('../db/pool');

const createNewUser = async (data, id) => {
  try {
    const { email, name, surname, password } = data;
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status, password) VALUES (
	 '${id}', '${email}', '${name}', '${surname}', '', '${password}' );
    `);
    return { id, ...data };
  } catch (error) {
    return null;
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
        return { ...result.rows[0], photos: {} };
      }
    }
    return null;
  } catch (error) {
    return null;
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
