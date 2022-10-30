const pool = require('../db/pool');

async function getRes() {
  let res = await pool.query(`SELECT * FROM users;`);
  res = res.rows;
  console.log(res);
}

async function setValue(token, data, callback) {
  try {
    console.log('SETVALUE', data.id);
    await pool.query(`
   UPDATE users SET token = '${token}', data = '${data}' WHERE id = '${
      JSON.parse(data).id
    }';`);
    return callback(token);
  } catch (error) {
    return 'Wrong!';
  }
}

async function getValue(token, callback) {
  const value = await pool.query(`
   SELECT token, data
    FROM users
    WHERE token='${token}'`);
  const [object] = value.rows;
  if (object === undefined) return;
  return callback(object.data);
}

async function deleteValue(key, callback) {
  await pool.query(`DELETE
      FROM sessions
      WHERE token='${key}'`);
  return callback(key);
}

getRes();
module.exports = { setValue, getRes, getValue, deleteValue };
