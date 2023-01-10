const { methodsConfig } = require('./configuration.js');

const routing = {
  '/auth/login': methodsConfig.login.handle(args),
  '/auth/me': methodsConfig.me.handle(args),
  '/register': methodsConfig.register.handle(args),
  '/profile/:id': methodsConfig.profile.handle(args),
  '/profile/status/:id': methodsConfig.status.handle(args),
  '/profile/skills/:id': methodsConfig.skills.handle(args),
  '/profile/posts/:id': methodsConfig.posts.handle(args),
  '/profile/likes/:id': methodsConfig.likes.handle(args),
  '/users': methodsConfig.users.handle(args),
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
