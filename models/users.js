const pool = require('../db/pool');

const getUsers = async (query) => {
  try {
    const { page, count } = query;
    console.log(count);
    const users = await pool.query(`SELECT * from users
          ORDER By id
          OFFSET ${count * (page - 1)} ROWS
          FETCH NEXT ${count} ROWS ONLY;`);
    const totalCount = await pool.query(`SELECT COUNT(id) FROM users;`);
    return { items: users.rows, totalCount: Number(totalCount.rows[0].count) };
  } catch (error) {
    return null;
  }
};

const createNewUser = async (data, id) => {
  try {
    const { email, name, surname, password } = data;
    await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status, skills, password) VALUES (
	 '${id}', '${email}', '${name}', '${surname}', '', '', '${password}');
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

const updateUser = async (id, queryPart, param) => {
  try {
    await pool.query(` UPDATE users SET '${queryPart}' WHERE id = '${id}';`);
    return { param, resultCode: 0 };
  } catch (error) {
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

module.exports = {
  getUsers,
  createNewUser,
  findUser,
  updateUser,
};
