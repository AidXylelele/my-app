const storage = require('./storage.js');
const { generateToken } = require('./token');

class Session extends Map {
  constructor(token, id) {
    super();
    this.token = token;
    this.id = id;
  }

  static start(client, id) {
    if (client.session) return client.session;
    const token = generateToken();
    client.token = token;
    const session = new Session(token, id);
    client.session = session;
    client.setCookie('token', token);
    storage.set(token, session);
    return session;
  }

  static restore(client) {
    const { cookie } = client;
    if (!cookie) return;
    const sessionToken = cookie.token;
    if (sessionToken) {
      return new Promise((resolve, reject) => {
        storage.get(sessionToken, (err, session) => {
          if (err) reject(new Error('No session'));
          console.log(session);
          Object.setPrototypeOf(session, Session.prototype);
          client.token = sessionToken;
          client.session = session;
          resolve(session);
        });
      });
    }
  }

  static delete(client) {
    const { token } = client;
    if (token) {
      client.deleteCookie('token');
      client.token = undefined;
      client.session = null;
      storage.delete(token);
    }
  }

  save() {
    storage.save(this.token);
  }
}

module.exports = Session;
