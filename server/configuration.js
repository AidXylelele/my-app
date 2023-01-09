const {
  getPostsControler,
  createPostController,
  updatePostController,
  deletePostController,
} = require('../controllers/postController');
const { authUserController } = require('../controllers/registrationController');
const {
  findUserController,
  createNewUserController,
  getUserStatusController,
  updateUserStatusController,
  updateUserSkillsController,
  getUsersController,
  getUserSkillsController,
} = require('../controllers/userController');
const RequestService = require('./service/request-service');
const SessionService = require('./service/session-service');
const Session = require('./session');

const AccessHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  'Access-Control-Allow-Headers':
    'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
};

const methodsConfig = {
  login: {
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(authUserController)
        .then((data) => SessionService.start(client, data, Session.start)),
    DELETE: async ({ client }) => SessionService.delete(client, Session.delete),
  },
  me: {
    GET: async ({ client }) => {
      if (client.cookie) {
        return await findUserController(client.cookie);
      }
      return { messages: 'Token doesn`t exist!', resultCode: 1 };
    },
  },
  register: {
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(createNewUserController)
        .then((data) => SessionService.start(client, data, Session.start)),
  },
  profile: {
    GET: async ({ params }) => await findUserController(params),
  },
  status: {
    GET: async ({ params }) => await getUserStatusController(params),
    PUT: async ({ client, params }) => {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        updateUserStatusController(data, params)
      );
    },
  },
  skills: {
    GET: async ({ params }) => await getUserSkillsController(params),
    PUT: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        updateUserSkillsController(data, params)
      ),
  },
  posts: {
    GET: async ({ params }) => await getPostsControler(params),
    POST: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        createPostController(data.post, params)
      ),
    PUT: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        updatePostController(data.status, data.id)
      ),
    DELETE: async ({ params }) => await deletePostController(params),
  },
  users: {
    GET: async ({ parsedQuery }) => await getUsersController(parsedQuery),
  },
  likes: {
    GET: async ({ params }) => {},
    PUT: async ({ client, params }) => {},
    PATCH: async ({ client, params }) => {},
  },
};

module.exports = { AccessHeaders, methodsConfig };
