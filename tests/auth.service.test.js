require('dotenv').config({ path: '.env.test' });
const mongoose = require('mongoose');
const { loginUser, registerUser } = require('../services/auth.service');
const User = require('../models/User');

describe('Auth Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    await registerUser({ email: 'test@milman.local', password: '123456' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('should login user and return token', async () => {
    const { token } = await loginUser('test@milman.local', '123456');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('should throw error for invalid login', async () => {
    await expect(
      loginUser('invalid@milman.local', 'wrongpass')
    ).rejects.toThrow('Invalid credentials');
  });
});