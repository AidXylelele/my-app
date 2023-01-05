const http = require('node:http');
const querystring = require('node:querystring');
const Client = require('./server/client.js');
const { routing, types } = require('./server/routings.js');
const { match } = require('node-match-path');
const { AccessHeaders, PORT } = require('./server/configuration.js');

http
  .createServer(async (req, res) => {
    const client = await Client.getInstance(req, res);
    const { method, url, headers } = req;
    console.log(`${method} ${url} ${headers.cookie}`);
    let handler;
    let params = {};
    let parsedQuery = {};
    for (const item in routing) {
      const [path, query] = url.split('?');
      const result = match(item, path);
      if (result.matches) {
        parsedQuery = querystring.parse(query);
        handler = routing[item];
        params = result.params;
        break;
      }
    }
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
