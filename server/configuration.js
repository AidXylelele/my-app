const { PostControllers } = require('../controllers/postController');
const { authUserController } = require('../controllers/registrationController');
const { UserControllers } = require('../controllers/userController');
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
        return await UserControllers.findUserController(client.cookie);
      }
      return { messages: 'Token doesn`t exist!', resultCode: 1 };
    },
  },
  register: {
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(UserControllers.createNewUserController)
        .then((data) => SessionService.start(client, data, Session.start)),
  },
  profile: {
    GET: async ({ params }) => await UserControllers.findUserController(params),
  },
  status: {
    GET: async ({ params }) => await UserControllers.getUserStatusController(params),
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
    GET: async ({ params }) => await PostControllers.getPostsController(params),
    POST: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostControllers.createPostController(data.post, params)
      ),
    PUT: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostControllers.updatePostController(data.status, data.id)
      ),
    DELETE: async ({ params }) => await PostControllers.deletePostController(params),
  },
  users: {
    GET: async ({ parsedQuery }) => await UserControllers.getUsersController(parsedQuery),
  },
};

module.exports = { AccessHeaders, methodsConfig };
