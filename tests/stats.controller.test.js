require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Personnel = require('../models/Personnel');
const TrainingRecord = require('../models/TrainingRecord');

let token = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Personnel.deleteMany({});
  await TrainingRecord.deleteMany({});

  const user = new User({ email: 'admin@milman.local', password: '123456', role: 'admin' });
  await user.save();
  token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Stats Controller', () => {
  test('should return personnel by unit', async () => {
    const res = await request(app)
      .get('/api/stats/personnel-by-unit')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should return training participation', async () => {
    const res = await request(app)
      .get('/api/stats/training-participation')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should return personnel by rank', async () => {
    const res = await request(app)
      .get('/api/stats/personnel-by-rank')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});