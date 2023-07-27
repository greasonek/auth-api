'use strict';

require('dotenv').config();
const server = require('../auth-server/src/server');
const supertest = require('supertest');
const mockServer = supertest(server);
const { sequelize } = require('../auth-server/src/auth/models/users.js');

const userOne = { username: 'Emma', password: '1234' };

beforeAll(async(done) => {
  await sequelize.sync();
  done();
});
afterAll(async (done) => {
  await sequelize.drop();
  done();
});

describe('test server routes and database', () => {
  test('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer
      .post('/signup')
      .send(userOne);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('Emma');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
  xtest('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer
      .post('/signin')
      .auth(userOne.username, userOne.password);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text).username).toBe('Emma');
    expect(JSON.parse(res.text).password).toBeTruthy();
  });
});