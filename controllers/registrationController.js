const pool = require('../db/pool');
const { findUser } = require('../models/users');

const { parseRequestBody } = require('../server/utils');

async function getRes() {
  let res = await pool.query(`SELECT * FROM users;`);
  res = res.rows;
  console.log(res);
}

function getRequestData(request, callback) {
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
        resolve(callback(dataObj));
      })
  );
}

async function authUser(data) {
  return await findUser(data).then((response) => {
    if (data.password == response.password) {
      return response;
    }
  });
}

getRes();
module.exports = { getRequestData, authUser };
