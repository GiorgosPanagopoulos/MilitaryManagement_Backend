const mongoose = require('mongoose');
const personnelService = require('../services/personnel.service');
const Personnel = require('../models/Personnel');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  jest.restoreAllMocks();
  await Personnel.deleteMany();
});

describe('🧪 Unit tests για personnel.service.js (με mocking populate)', () => {
  it('✅ create - δημιουργεί νέο στέλεχος', async () => {
    const data = {
      firstName: 'Νίκος',
      lastName: 'Παπαδόπουλος',
      rank: 'Ανθ/γός',
      serviceNumber: 'PN10000',
      phone: '6900000000',
      email: 'nikos@example.com',
      unit: 'ΚΕ Πόρος',
    };

    const result = await personnelService.create(data);

    expect(result).toHaveProperty('_id');
    expect(result.email).toBe('nikos@example.com');
  });

  it('✅ findAll - επιστρέφει όλο το προσωπικό', async () => {
    const sample = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Γιώργος',
      lastName: 'Λάμπρου',
      rank: 'Ανθ/γός',
      serviceNumber: 'PN22222',
      phone: '6912345678',
      email: 'giorgos@example.com',
      unit: 'Ναύσταθμος',
    };

    const mockQuery = {
      populate: jest.fn().mockReturnThis(),
      then: jest.fn((cb) => cb([sample])), // simulation του await
    };

    jest.spyOn(Personnel, 'find').mockImplementation(() => mockQuery);

    const results = await personnelService.findAll();
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(1);
    expect(results[0].email).toBe('giorgos@example.com');
  });

  it('✅ findById - επιστρέφει στέλεχος με βάση ID', async () => {
    const sample = {
      _id: new mongoose.Types.ObjectId(),
      firstName: 'Αναστασία',
      lastName: 'Κωνσταντίνου',
      rank: 'Ανθπλ/ρχος',
      serviceNumber: 'PN30000',
      phone: '6923456789',
      email: 'anastasia@example.com',
      unit: 'ΔΔΜΝ',
    };

    const mockQuery = {
      populate: jest.fn().mockReturnThis(),
      then: jest.fn((cb) => cb(sample)),
    };

    jest.spyOn(Personnel, 'findById').mockImplementation(() => mockQuery);

    const result = await personnelService.findById(sample._id);
    expect(result).not.toBeNull();
    expect(result.email).toBe('anastasia@example.com');
  });

  it('✅ update - ενημερώνει τα δεδομένα σωστά', async () => {
    const created = await Personnel.create({
      firstName: 'Μαρία',
      lastName: 'Σταυρίδου',
      rank: 'Σημαιοφόρος',
      serviceNumber: 'PN44444',
      phone: '6934567890',
      email: 'maria@example.com',
      unit: 'ΣΝΔ',
    });

    const updated = await personnelService.update(created._id, { unit: 'ΥΝ' });
    expect(updated.unit).toBe('ΥΝ');
  });

  it('✅ remove - διαγράφει το προσωπικό σωστά', async () => {
    const created = await Personnel.create({
      firstName: 'Αλέξης',
      lastName: 'Καρράς',
      rank: 'Πλοίαρχος',
      serviceNumber: 'PN55555',
      phone: '6945678901',
      email: 'alex@example.com',
      unit: 'ΥΝ',
    });

    const deleted = await personnelService.remove(created._id);
    const check = await Personnel.findById(created._id);

    expect(deleted).not.toBeNull();
    expect(check).toBeNull();
  });
});
