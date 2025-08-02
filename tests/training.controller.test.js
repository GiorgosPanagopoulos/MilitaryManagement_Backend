require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const TrainingRecord = require('../models/TrainingRecord');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let token = '';
let trainingId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await TrainingRecord.deleteMany({});

  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = new User({ email: 'admin@milman.local', password: hashedPassword, role: 'admin' });
  await user.save();

  token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Training Controller', () => {
  test('should create a new training', async () => {
    const res = await request(app)
      .post('/api/training')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Νέα Εκπαίδευση',
        location: 'Σχολή Ναυτικών Δοκίμων',
        from_date: '2025-08-01',
        to_date: '2025-08-03',
        personnel: []
      });

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();
    trainingId = res.body._id;
  });

  test('should update the training', async () => {
    const res = await request(app)
      .put(`/api/training/${trainingId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ location: 'Ναύσταθμος Σαλαμίνας' });

    expect(res.statusCode).toBe(200);
    expect(res.body.location).toBe('Ναύσταθμος Σαλαμίνας');
  });

  test('should delete the training', async () => {
    const res = await request(app)
      .delete(`/api/training/${trainingId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Η εκπαίδευση διαγράφηκε επιτυχώς');
  });
});
