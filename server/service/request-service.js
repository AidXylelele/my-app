class RequestService {
  static getRequestBodyData(request, reject) {
    let body = [];
    return new Promise((resolve) =>
      request
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          const dataObj = JSON.parse(body);
          resolve(dataObj);
        })
        .on('error', (err) => {
          reject(err);
        })
    );
  }
}

module.exports = RequestService;
