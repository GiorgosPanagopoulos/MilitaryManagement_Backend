const trainingService = require('../services/training.service');
const mongoose = require('mongoose');
require('../models/Personnel');

describe('Training Service', () => {
  let training;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/testdb');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create a training', async () => {
    training = await trainingService.create({
      description: 'Test Εκπαίδευση',
      location: 'Πόρος',
      from_date: '2025-01-01',
      to_date: '2025-01-02',
      personnel: [],
    });
    expect(training.description).toBe('Test Εκπαίδευση');
  });

  it('should update a training', async () => {
    const updated = await trainingService.update(training._id, { location: 'Χανιά' });
    expect(updated.location).toBe('Χανιά');
  });

  it('should delete a training', async () => {
    const result = await trainingService.remove(training._id);
    expect(result._id.toString()).toBe(training._id.toString());
  });
});
