const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Personnel = require("../models/Personnel");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

let mongoServer;
let adminToken;
let personId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  await mongoose.connect(mongoServer.getUri());

  const admin = await User.create({
    email: "admin@milman.local",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  });

  const person = await Personnel.create({
    firstName: "Δοκιμαστικός",
    lastName: "Χρήστης",
    rank: "Ανθ/γός",
    serviceNumber: "PN99999",
    phone: "6999999999",
    email: "test@example.com",
    unit: "ΣΝΔ"
  });

  adminToken = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET || "secret");
  personId = person._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("📂 File Upload API", () => {
  test("✅ Επιτυχής μεταφόρτωση αρχείου .pdf", async () => {
    const res = await request(app)
      .post(`/api/uploads/personnel/${personId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .attach("file", path.resolve(__dirname, "mock-files", "sample.pdf"));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("file");
    expect(res.body.file.originalname).toBe("sample.pdf");
  });

  test("❌ Απόρριψη χωρίς αρχείο", async () => {
    const res = await request(app)
      .post(`/api/uploads/personnel/${personId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Δεν επιλέχθηκε αρχείο");
  });
});