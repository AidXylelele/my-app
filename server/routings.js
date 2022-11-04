const Session = require('./session.js');
const { getRequestData } = require('./utils.js');
const {
  authUserController,
} = require('../controllers/registrationController.js');
const {
  findUserController,
  createNewUserController,
} = require('../controllers/userController.js');

const routing = {
  '/auth/login': async (client, params) => {
    const { method } = client.req;
    if (method == 'POST') {
      return await getRequestData(client.req, authUserController).then(
        (data) => {
          if (data) {
            Session.start(client, data.id);
            return {
              messages: '',
              resultCode: 0,
            };
          }
        }
      );
    } else if (method == 'DELETE') {
      Session.delete(client);
      return {
        messages: '',
        resultCode: 0,
      };
    }
  },
  '/auth/me': async (client, params) => {
    const { method } = client.req;
    if (method == 'GET') {
      if (client.cookie) {
        return await findUserController(client.cookie);
      }
      return 'res';
    }
  },
  '/register': async (client, params) => {
    const { method } = client.req;
    if (method == 'POST') {
      return await getRequestData(client.req, createNewUserController);
    }
  },
  '/profile/:id': async (client, params) => {
    const { method } = client.req;
    if (method == 'GET') {
      return await findUserController(params);
    }
  },
  '/api/method1': async (client) => {
    if (client.session) {
      client.session.set('method1', 'called');
      return { data: 'example result' };
    } else {
      return { data: 'access is denied' };
    }
  },
  '/api/method2': async (client) => ({
    url: client.req.url,
    headers: client.req.headers,
  }),
  '/api/method3': async (client) => {
    if (client.session) {
      return [...client.session.entries()]
        .map(([key, value]) => `<b>${key}</b>: ${value}<br>`)
        .join();
    }
    return 'No session found';
  },
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
};

module.exports = { routing, types };
