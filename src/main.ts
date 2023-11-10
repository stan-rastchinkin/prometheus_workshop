import express from 'express';

import router from './routes.js';

const app = express();

const APP_PORT = process.env.APP_PORT;
if (!APP_PORT) {
  throw new Error('APP_PORT is not defined');
}

app.use(router);

console.log(`Listening on ${APP_PORT}`);

app.listen(APP_PORT);
