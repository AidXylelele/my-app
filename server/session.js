const storage = require('./storage.js');

const TOKEN_LENGTH = 32;
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGITS = '0123456789';
const ALPHA_DIGIT = ALPHA + DIGITS;

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = '';
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

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
