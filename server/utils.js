const parseRequestBody = (body) => {
  const res = {};
  const array = body.replace(/[{"}]/g, '').split(',');
  for (let item of array) {
    const pair = item.split(':');
    res[pair[0]] = pair[1];
  }
  return res;
};

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

module.exports = { getRequestData };
