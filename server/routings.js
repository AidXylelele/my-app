const Session = require('./session.js');
const RequestService = require('./service/request-service.js');
const SessionService = require('./service/session-service.js');
const {
  authUserController,
} = require('../controllers/registrationController.js');
const {
  findUserController,
  createNewUserController,
  updateUserStatusController,
  getUserStatusController,
} = require('../controllers/userController.js');
const {
  getPostsControler,
  createPostController,
  updatePostController,
} = require('../controllers/postController.js');

const routing = {
  '/auth/login': async (client) => {
    if (client.req.method === 'POST') {
      return await RequestService.getRequestBodyData(client.req)
        .then(authUserController)
        .then((data) => SessionService.start(client, data, Session.start));
    } else if (client.req.method === 'DELETE') {
      SessionService.delete(client, Session.delete);
    }
  },
  '/auth/me': async (client) => {
    if (client.req.method === 'GET') {
      if (client.cookie) {
        return await findUserController(client.cookie);
      }
      return { messages: 'Token doesn`t exist!', resultCode: 1 };
    }
  },
  '/register': async (client) => {
    if (client.req.method === 'POST') {
      return await RequestService.getRequestBodyData(client.req)
        .then(createNewUserController)
        .then((data) => SessionService.start(client, data, Session.start));
    }
  },
  '/profile/:id': async (client, params) => {
    if (client.req.method === 'GET') {
      return await findUserController(params);
    }
  },
  '/profile/status/:id': async (client, params) => {
    if (client.req.method === 'GET') {
      return await getUserStatusController(params);
    } else if (client.req.method === 'PUT') {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        updateUserStatusController(data, params)
      );
    }
  },
  '/profile/posts/:id': async (client, params) => {
    if (client.req.method === 'GET') {
      return await getPostsControler(params);
    } else if (client.req.method === 'POST') {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        createPostController(data.post, params)
      );
    } else if (client.req.method === 'PUT') {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        updatePostController(data.status, data.id)
      );
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
