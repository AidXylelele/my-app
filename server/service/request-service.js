class RequestService {
  constructor() {}
  static parseRequestBody(body) {
    return JSON.parse(body);
  }
  static getRequestBodyData(request) {
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
          const dataObj = RequestService.parseRequestBody(body);
          console.log("GGGGGGGGGGG", dataObj)
          resolve(dataObj);
        })
    );
  }
}

module.exports = RequestService;
