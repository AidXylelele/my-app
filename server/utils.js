const parseRequestBody = (body) => {
  const res = {};
  const array = body.replace(/[{"}]/g, '').split(',');
  for (let item of array) {
    const pair = item.split(':');
    res[pair[0]] = pair[1];
  }
  return res;
};

module.exports = { parseRequestBody };
