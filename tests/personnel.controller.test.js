const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Personnel = require('../models/Personnel');
const jwt = require('jsonwebtoken');

let mongoServer;
let userToken;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(mongoServer.getUri());

  // Δημιουργία mock token
  userToken = jwt.sign({ id: 'testuser', role: 'user' }, process.env.JWT_SECRET || 'your_jwt_secret');
  adminToken = jwt.sign({ id: 'adminuser', role: 'admin' }, process.env.JWT_SECRET || 'your_jwt_secret');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Personnel.deleteMany({});
});

describe('👤 Personnel Controller CRUD', () => {
  test('POST /api/personnel - δημιουργεί στέλεχος', async () => {
    const res = await request(app)
      .post('/api/personnel')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        firstName: 'Γιώργος',
        lastName: 'Παναγόπουλος',
        rank: 'Σημαιοφόρος',
        serviceNumber: 'PN123456',
        phone: '6987654321',
        email: 'giorgos@mil.gr',
        unit: 'ΜΥΚ'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('Γιώργος');
  });

  test('GET /api/personnel - επιστρέφει όλα τα στελέχη', async () => {
    await Personnel.create({
      firstName: 'Άννα',
      lastName: 'Δημητρίου',
      rank: 'Ανθυποπλοίαρχος',
      serviceNumber: 'PN654321',
      phone: '6900000000',
      email: 'anna@mil.gr',
      unit: 'ΣΔΑΜ'
    });

    const res = await request(app)
      .get('/api/personnel')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].email).toBe('anna@mil.gr');
  });

  test('GET /api/personnel/:id - επιστρέφει συγκεκριμένο στέλεχος', async () => {
    const created = await Personnel.create({
      firstName: 'Νίκος',
      lastName: 'Καραγιάννης',
      rank: 'Ανθυποπλοίαρχος',
      serviceNumber: 'PN000111',
      phone: '6999999999',
      email: 'nikos@mil.gr',
      unit: 'ΔΝΕ'
    });

    const res = await request(app)
      .get(`/api/personnel/${created._id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('nikos@mil.gr');
  });

  test('PUT /api/personnel/:id - ενημερώνει στέλεχος', async () => {
    const created = await Personnel.create({
      firstName: 'Πέτρος',
      lastName: 'Λάμπρου',
      rank: 'Σημαιοφόρος',
      serviceNumber: 'PN222333',
      phone: '6970000000',
      email: 'petros@mil.gr',
      unit: 'ΔΔΜΝ'
    });

    const res = await request(app)
      .put(`/api/personnel/${created._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ unit: 'ΔΝΕ' });

    expect(res.statusCode).toBe(200);
    expect(res.body.unit).toBe('ΔΝΕ');
  });

  test('DELETE /api/personnel/:id - διαγράφει στέλεχος (admin μόνο)', async () => {
    const created = await Personnel.create({
      firstName: 'Μαρία',
      lastName: 'Χρήστου',
      rank: 'Ανθυποπλοίαρχος',
      serviceNumber: 'PN888999',
      phone: '6991111111',
      email: 'maria@mil.gr',
      unit: 'ΔΝΕ'
    });

    const res = await request(app)
      .delete(`/api/personnel/${created._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
