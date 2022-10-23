const http = require('node:http');
const { setUserValue } = require('./controllers/registrationController.js');

const Client = require('./server/client.js');
const Session = require('./server/session.js');

const routing = {
  '/': async () => '<h1>welcome to homepage</h1><hr>',
  '/start': async (client) => {
    Session.start(client);
    return `Session token is: ${client.token}`;
  },
  '/register': async (client) => {
    return setUserValue(client.req);
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
