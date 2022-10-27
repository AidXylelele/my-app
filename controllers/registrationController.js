const pool = require('../db/pool');
const { createNewUser } = require('../models/users');
const { parseRequestBody } = require('../server/utils');

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
    .on('end', () => {
      new Promise((resolve, reject) => {
        body = Buffer.concat(body).toString();
        const dataObj = parseRequestBody(body);
        resolve(dataObj);
      }).then((data) => {
        createNewUser(data);
      });
    });
  console.log('ready');
  return 'Good work!';
}

getRes();
module.exports = { setUserValue };
