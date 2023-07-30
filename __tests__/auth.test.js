'use strict';

require('dotenv').config();
const { app } = require('../auth-server/src/server');
const supertest = require('supertest');
const mockServer = supertest(app);
const { db, users } =  require('../auth-server/src/models');
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

afterAll(async () => {
  await db.drop();
});


//V2 AUTH

// GET
describe('ACL Integration', () => {
  test('the user should be able to access an item ', async () => {
    const res = (await mockServer.get('/read')).setEncoding('Authorization', `Bearer ${testWriter.token}` );
    expect(res.status).toBe(200);
    expect(res.text).toEqual('you have access');
  });
});


//POST
describe('ACL Integration', () => {
  test('the user should be able to create an item', async () => {
    const res = await mockServer.post('/signup').send({username: 'emma', password: '123', role: 'admin'});
    expect(res.status).toBe(201);
    // expect(res.text).toEqual('you have created a new item');
  });
  test('we can create a food with a valid user', async () => {
    const res = await mockServer.post('/api/v2/food').set('Authoirzation', `Bearer ${testAdmin.token}` ).send({name: 'radish', calories: 20, type: 'vegetable'});
    expect(res.status).tobe(201);
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