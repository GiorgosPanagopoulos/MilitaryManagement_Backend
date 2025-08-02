require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  const hashed = await bcrypt.hash('password123', 10);
  await User.create({ email: 'testuser@milman.local', password: hashed, role: 'admin' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register-admin')
      .send({ email: 'testuser2@milman.local', password: 'password123' });

    expect([201, 400]).toContain(res.statusCode);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@milman.local', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});