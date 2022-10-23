const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

async function getRes() {
  let res = await pool.query(`SELECT * FROM users;`);
  res = res.rows;
  console.log(res);
}

async function setUserValue(request) {
  let body = [];
  request
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', async () => {
      const dataObj = {};
      body = Buffer.concat(body).toString();
      const array = body.replace(/[{"}]/g, '').split(',');
      for (let item of array) {
        const pair = item.split(':');
        dataObj[pair[0]] = pair[1];
      }
      await pool.query(`
    INSERT INTO users(
	id, email, name, surname, status) VALUES (
	 '${uuidv4()}', '${dataObj.email}', '${dataObj.name}', '${
        dataObj.surname
      }', '' );
    `);
    });
  console.log('ready');
  return 'Good work!';
}

// async function getValue(token, callback) {
//   const value = await pool.query(`
//    SELECT token, data
//     FROM sessions
//     WHERE token='${token}'`);
//   const [object] = value.rows;
//   if (object === undefined) return;
//   return callback(object.data);
// }

// async function deleteValue(key, callback) {
//   await pool.query(`DELETE
//       FROM sessions
//       WHERE token='${key}'`);
//   return callback(key);
// }

getRes();
module.exports = { setUserValue };
