'use strict';

require('dotenv').config();
const { server } = require('../auth-server/src/server');
const supertest = require('supertest');
const mockServer = supertest(server);
const { db, users } =  require('../auth-server/src/models/index');
// const users = require('../auth-server/src/auth/models/users');

let testWriter;
let testAdmin;

beforeAll(async () => {
  await db.sync();
  testWriter = await users.create({
    username: 'Writer',
    password: '1234',
    role: 'writer'
  });
  testAdmin = await users.create({
    username: 'Admin',
    password: '5678',
    role: 'admin'
  });
});

// afterAll(async () => {
//   await db.drop();
// });


//V2 AUTH
// GET
describe('ACL Integration', () => {
  test('the user should be able to access an item ', async () => {
    let res = (await mockServer.get('/read')).setEncoding('Authorization', `Bearer ${testWriter.token}` );
    expect(res.status).toBe(200);
    expect(res.text).toEqual('you have access');
  });
});
//POST
describe('ACL Integration', () => {
  test('the user should be able to create an item', async () => {
    let res = await mockServer.get('create').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(res.status).toBe(200);
    expect(res.text).toEqual('you have created a new item');
  });
});
//PUT
describe('ACL Integration', () => {
  test('user should be able to update an item', async () => {
    let res = await mockServer.get('update').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(res.status).toBe(200);
    expect(res.text).toEqual('you have updated an item');
  });
});
//DELETE
describe('ACL Integration', () => {
  test('user should be able to delete an item', async () => {
    let res = await mockServer.get('delete').set('Authorization', `Bearer ${testAdmin.token}`);
    expect(res.status).toBe(500);
    expect(res.text).toEqual('you have deleted an item');
  });
});