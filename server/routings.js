const { methodsConfig } = require('./configuration.js');

const methodHandler = async (args, config) => {
  const { client } = args;
  const { method } = client.req;
  const hanlder = config[method];
  if (hanlder) {
    return await hanlder(args);
  }
};

const routing = {
  '/auth/login': async (args) => {
    return await methodHandler(args, methodsConfig.login);
  },
  '/auth/me': async (args) => {
    return await methodHandler(args, methodsConfig.me);
  },
  '/register': async (args) => {
    return await methodHandler(args, methodsConfig.register);
  },
  '/profile/:id': async (args) => {
    return await methodHandler(args, methodsConfig.profile);
  },
  '/profile/status/:id': async (args) => {
    return await methodHandler(args, methodsConfig.status);
  },
  '/profile/skills/:id': async (args) => {
    return await methodHandler(args, methodsConfig.skills);
  },
  '/profile/posts/:id': async (args) => {
    return await methodHandler(args, methodsConfig.posts);
  },
  '/users': async (args) => {
    return await methodHandler(args, methodsConfig.users);
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
