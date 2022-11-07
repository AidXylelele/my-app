class SessionService {
  constructor() {}
  static start(...args) {
    const [client, response, callback] = args;
    const { id, messages, resultCode } = response;
    if (id) {
      callback(client, id);
    }
    return { messages, resultCode };
  }
  static delete(...args) {
    const [client, callback] = args;
    callback(client);
    return {
      messages: '',
      resultCode: 0,
    };
  }
}

module.exports = SessionService;
