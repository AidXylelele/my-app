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

const updateUserStatus = async (dataObject, params) => {
  try {
    const { id } = params;
    const { status } = dataObject;
    await pool.query(
      ` UPDATE users SET status = '${status}' WHERE id = '${id}';`
    );
    return { status, resultCode: 0 };
  } catch (error) {
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

const updateUserSkills = async (dataObject, params) => {
  try {
    const { id } = params;
    const { skills } = dataObject;
    await pool.query(
      ` UPDATE users SET skills = '${skills}' WHERE id = '${id}';`
    );
    return { skills, resultCode: 0 };
  } catch (error) {
    return { messages: 'Something went wrong!', resultCode: 1 };
  }
};

module.exports = {
  getUsers,
  createNewUser,
  findUser,
  updateUserStatus,
  updateUserSkills,
};
