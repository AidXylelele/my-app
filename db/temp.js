const pool = require('./db');

async function getRes() {
  let res = await pool.query(`DELETE FROM sessions;`);
  res = res.rows;
  console.log(res);
}

async function setValue(token, data, callback) {
  await pool.query(`
    INSERT INTO sessions(
	token, data) VALUES (
	 '${token}', '${data}');
    `);
  return callback(token);
}

async function getValue(token, callback) {
  const value = await pool.query(`
   SELECT token, data
    FROM sessions
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
