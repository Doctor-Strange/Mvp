const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware');

const nextI18next = require('./src/i18n');

const routes = require('./routes')

const port = process.env.PORT || 8080;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const translation = nextI18NextMiddleware(nextI18next);

const { parse } = require('url');
const { join } = require('path');

(async () => {
  await app.prepare();
  const server = express();

  server.use(handler);

  server.use(translation);

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res);
    }
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`);
})();
