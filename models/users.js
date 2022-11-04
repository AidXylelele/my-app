const pool = require('../db/pool');

const createNewUser = async (data, id) => {
  try {
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status, password) VALUES (
	 '${id}', '${data.email}', '${data.name}', '${data.surname}', '', '${data.password}' );
    `);
    return { ...data, resultCode: 0 };
  } catch (error) {
    return 'User with the same E-mail was created!';
  }
};

const findUser = async (dataObject) => {
  try {
    const key = Object.keys(dataObject).filter(
      (item) => item == 'email' || item == 'token' || item == 'id'
    );
    const result = await pool.query(`
     SELECT * FROM users WHERE ${key[0]} = '${dataObject[key[0]]}'`);
    return { ...result.rows[0], photos: {}, resultCode: 0 };
  } catch (error) {
    console.log(error);
    return { data: 'User does`t exist!', resultCode: 1 };
  }
};

module.exports = { createNewUser, findUser };
