const http = require('node:http');
const querystring = require('node:querystring');
const Client = require('./server/client.js');
const WebSocket = require('ws');
const { routing, types } = require('./server/routings.js');
const { match } = require('node-match-path');
const { AccessHeaders, PORT, events } = require('./server/configuration.js');

const parseParameters = (url, routing) => {
  let handler;
  let params = {};
  let parsedQuery = {};
  for (const route in routing) {
    const [path, query] = url.split('?');
    const result = match(route, path);
    if (result.matches) {
      parsedQuery = querystring.parse(query);
      handler = routing[route];
      params = result.params;
      break;
    }
  }
  return { handler, params, parsedQuery };
};

const server = http
  .createServer(async (req, res) => {
    const client = await Client.getInstance(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url} ${headers.cookie}`);
    const { handler, params, parsedQuery } = parseParameters(url, routing);
    res.on('finish', () => {
      if (client.session) client.session.save();
    });
    if (!handler) {
      res.statusCode = 404;
      res.end('Not found 404');
      return;
    }
    handler({ client, params, parsedQuery }).then(
      (data) => {
        const type = typeof data;
        const serializer = types[type];
        const result = serializer(data);
        for (const header in AccessHeaders) {
          const value = AccessHeaders[header];
          res.setHeader(header, value);
        }
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
  .listen(PORT);

const ws = new WebSocket.Server({ server });

ws.on('connection', events.connection);
