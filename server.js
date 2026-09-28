/**
 * AquaNexa Production Server Entry
 * cPanel Node.js App ke liye startup file
 *
 * cPanel mein "Application root" poora project folder aur "Application startup file" server.js set karna.
 */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, () => {
    console.log(`> AquaNexa ready on http://${hostname}:${port}`);
    console.log(`> NODE_ENV=${process.env.NODE_ENV || 'development'}`);
  });
});
