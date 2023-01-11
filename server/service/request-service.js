class RequestService {
  static parseRequestBody(body) {
    return JSON.parse(body);
  }
  static getRequestBodyData(request, reject) {
    let body = [];
    return new Promise((resolve) =>
      request
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          const dataObj = RequestService.parseRequestBody(body);
          console.log("GGGGGGGGGGG", dataObj)
          resolve(dataObj);
        })
        .on('error', (err) => {
          reject(console.error(err));
        })
    );
  }
}

module.exports = RequestService;
