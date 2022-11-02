const pool = require('../db/pool');

async function getRes() {
  let res = await pool.query(`SELECT * FROM users;`);
  res = res.rows;
  console.log(res);
}

async function setSessionToken(session) {
  try {
    await pool.query(`
   UPDATE users SET token = '${
     JSON.parse(session).token
   }', data = '${session}' WHERE id = '${JSON.parse(session).id}';`);
  } catch (error) {
    return 'Oops! Something went wrong!';
  }
}

async function getSessionToken(token) {
  try {
    const value = await pool.query(`
   SELECT token, data
    FROM users
    WHERE token='${token}'`);
    const [object] = value.rows;
    console.log('hello', object.data);
    if (object) return object.data;
  } catch (error) {
    return 'Oops! Something went wrong!';
  }
}

async function deleteSessionToken(token) {
  try {
    await pool.query(
      `UPDATE users SET token = '', data = '{}' WHERE token = '${token}';`
    );
    return 'Session was destroyed!';
  } catch (error) {
    return 'Oops! Something went wrong!';
  }
}

getRes();

module.exports = { setSessionToken, getSessionToken, deleteSessionToken };
