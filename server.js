const http = require('node:http');
const {
  getRequestData,
  authUser,
} = require('./controllers/registrationController.js');
const { createNewUser, findUserByToken } = require('./models/users.js');
const Client = require('./server/client.js');
const Session = require('./server/session.js');

const routing = {
  '/auth/login': async (client) => {
    const { method } = client.req;
    if (method == 'POST') {
      return await getRequestData(client.req, authUser).then((data) => {
        if (data) {
          Session.start(client, data.id);
          return {
            messages: '',
            data: { resultCode: 0 },
          };
        }
      });
    }
  },
  '/auth/me': async (client) => {
    const { method } = client.req;
    if (method == 'GET') {
      if (client.cookie) {
        return await findUserByToken(client.cookie);
      }
      return 'res';
    }
  },
  '/register': async (client) => {
    const { method } = client.req;
    if (method == 'POST') {
      return await getRequestData(client.req, createNewUser);
    }
  },
  '/destroy': async (client) => {
    const result = `Session destroyed: ${client.token}`;
    Session.delete(client);
    return result;
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

http
  .createServer(async (req, res) => {
    const client = await Client.getInstance(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url} ${headers.cookie}`);
    const handler = routing[url];
    res.on('finish', () => {
      if (client.session) client.session.save();
    });
    if (!handler) {
      res.statusCode = 404;
      res.end('Not found 404');
      return;
    }
    handler(client).then(
      (data) => {
        const type = typeof data;
        const serializer = types[type];
        const result = serializer(data);
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET,HEAD,OPTIONS,POST,PUT'
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        );
        client.sendCookie();
        res.end(result);
      },
      (err) => {
        res.statusCode = 500;
        res.end('Internal Server Error 500');
        console.log(err);
      }
    );
  })
  .listen(8000);
