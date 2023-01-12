const { methodsConfig } = require('./configuration.js');

const routing = {
  '/auth/login': methodsConfig.login.handle,
  '/auth/me': methodsConfig.me.handle,
  '/register': methodsConfig.register.handle,
  '/profile/:id': methodsConfig.profile.handle,
  '/profile/status/:id': methodsConfig.status.handle,
  '/profile/skills/:id': methodsConfig.skills.handle,
  '/profile/posts/:id': methodsConfig.posts.handle,
  '/profile/likes/:id': methodsConfig.likes.handle,
  '/users': methodsConfig.users.handle,
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n.toString(),
  undefined: () => 'not found',
};

module.exports = { routing, types };
