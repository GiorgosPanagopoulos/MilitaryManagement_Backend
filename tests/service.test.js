const request = require('supertest');
const app = require('../app');

describe('Service API', () => {
  it('GET /api/services - should return all services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});