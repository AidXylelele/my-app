const PostController = require('../controllers/postController');
const RegistrationController = require('../controllers/registrationController');
const UserController = require('../controllers/userController');
const LikeController = require('../controllers/likesController');
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

const methodHandler = async (args, config) => {
  const { client } = args;
  const { method } = client.req;
  const handler = config[method];
  if (handler) {
    return await handler(args);
  }
};

const methodsConfig = {
  login: {
    handle: async (args) => await methodHandler(args, methodsConfig.login),
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(RegistrationController.authUser)
        .then((data) => SessionService.start(client, data, Session.start)),
    DELETE: async ({ client }) => SessionService.delete(client, Session.delete),
  },
  me: {
    handle: async (args) => await methodHandler(args, methodsConfig.me),
    GET: async ({ client }) => {
      if (client.cookie) {
        return await UserController.findUser(client.cookie);
      }
      return { messages: 'Token doesn`t exist!', resultCode: 1 };
    },
  },
  register: {
    handle: async (args) => await methodHandler(args, methodsConfig.me),
    POST: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req)
        .then(UserController.createNewUser)
        .then((data) => SessionService.start(client, data, Session.start)),
  },
  profile: {
    handle: async (args) => await methodHandler(args, methodsConfig.profile),
    GET: async ({ params }) => await UserController.findUser(params),
  },
  status: {
    handle: async (args) => await methodHandler(args, methodsConfig.status),
    GET: async ({ params }) =>
      await UserController.getUserStatus(params),
    PUT: async ({ client, params }) => {
      return await RequestService.getRequestBodyData(client.req).then((data) =>
        UserController.updateUserStatus(data, params)
      );
    },
  },
  skills: {
    handle: async (args) => await methodHandler(args, methodsConfig.skills),
    GET: async ({ params }) =>
      await UserController.getUserSkills(params),
    PUT: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        UserController.updateUserSkills(data, params)
      ),
  },
  posts: {
    handle: async (args) => await methodHandler(args, methodsConfig.posts),
    GET: async ({ params }) => await PostController.getPosts(params),
    POST: async ({ client, params }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostController.createPost(data.post, params)
      ),
    PUT: async ({ client }) =>
      await RequestService.getRequestBodyData(client.req).then((data) =>
        PostController.updatePost(data.status, data.id)
      ),
    DELETE: async ({ params }) =>
      await PostController.deletePost(params),
  },
  users: {
    handle: async (args) => await methodHandler(args, methodsConfig.users),
    GET: async ({ parsedQuery }) =>
      await UserController.getUsers(parsedQuery),
  },
  likes: {
    handle: async (args) => await methodHandler(args, methodsConfig.likes),
    GET: async ({ params }) => await LikeController.getLikes(params),
    PUT: async ({ client, params }) => {},
    PATCH: async ({ client, params }) => {},
  },
};

const PORT = 3003;

module.exports = { AccessHeaders, methodsConfig, PORT };
