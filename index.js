'use strict';

require('dotenv').config();
const app = require('./auth-server/src/server.js');
const { db } = require('./auth-server/src/models/index.js');
const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  app.start(process.env.PORT || 3001);
});``;