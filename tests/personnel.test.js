const request = require('supertest');
const app = require('../app'); // το express app

describe('Personnel API', () => {
  it('GET /api/personnel - should return all personnel', async () => {
    const res = await request(app).get('/api/personnel');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});