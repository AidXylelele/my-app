const pool = require('../db/pool');
const { findUser } = require('../models/users');

const { parseRequestBody } = require('../server/utils');

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

module.exports = { getRequestData, authUser };
