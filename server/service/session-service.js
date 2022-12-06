class SessionService {
  constructor() {}
  static start(...args) {
    const [client, response, callback] = args;
    const { user, resultCode } = response;
    if (user) {
      callback(client, user.id);
    }
    return { messages: response.messages || '', resultCode };
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
