const pool = require('../db/pool');
const { createNewUser } = require('../models/users');
const { parseRequestBody } = require('../server/utils');

async function getRes() {
  let res = await pool.query(`SELECT * FROM users;`);
  res = res.rows;
  console.log(res);
}

function setUserValue(request) {
  let body = [];
  return new Promise((resolve) =>
    request
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const dataObj = parseRequestBody(body);
        resolve(createNewUser(dataObj));
      })
  );
}

getRes();
module.exports = { setUserValue };
