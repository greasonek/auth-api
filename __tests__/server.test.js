'use strict';

require('dotenv').config();
const {app} = require('../auth-server/src/server');
const supertest = require('supertest');
const mockServer = supertest(app);
const { db } = require('../auth-server/src/models');

// const userOne = { username: 'Emma', password: '1234' };

beforeAll(async(done) => {
  await db.sync();
  done();
});
// afterAll(async (done) => {
//   await db.drop({});
// });

describe('test server routes and database', () => {
  xtest('POST /signup creates a new user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer.post('/signup').send({username: 'Emily', password: '1234', role: 'admin'});
    expect(res.status).toEqual(201);
    // expect(res.body(userOne.token)).toBeTruthy();
  });
  test('POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client', async () => {
    const res = await mockServer.post('/signin').auth('Emily', '1234');
    console.log(res);
    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('Emily');
    // expect(JSON.parse(res.text).token).toBeTruthy();
  });
  test('can we make a request to /users', async () => {
    const res = await mockServer.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtaWx5IiwiaWF0IjoxNjkwNjUzODYxfQ.ZFSmfNpGCL57BZJil7leVtPiPkOtJZcmIeo8Dmo664c');
    expect(res.status).toBe(200);
  });
});