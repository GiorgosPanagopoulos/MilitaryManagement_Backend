const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Personnel = require("../models/Personnel");
const Training = require("../models/TrainingRecord");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

let mongoServer;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  await mongoose.connect(mongoServer.getUri());

  const admin = await User.create({
    email: "admin@milman.local",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  });

  adminToken = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET || "secret");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("📊 Stats API", () => {
  test("GET /stats/personnel-by-unit - empty DB", async () => {
    const res = await request(app)
      .get("/api/stats/personnel-by-unit")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("GET /stats/training-participation - empty DB", async () => {
    const res = await request(app)
      .get("/api/stats/training-participation")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("GET /stats/personnel-by-unit - με δεδομένα", async () => {
    await Personnel.create([
      { firstName: "Γιώργος", lastName: "Παπαδόπουλος", rank: "Ανθ/γός", serviceNumber: "PN001", phone: "6900000001", email: "gp@example.com", unit: "ΣΝΔ" },
      { firstName: "Μαρία", lastName: "Κωνσταντίνου", rank: "Ανθ/γός", serviceNumber: "PN002", phone: "6900000002", email: "mk@example.com", unit: "ΣΝΔ" },
      { firstName: "Νίκος", lastName: "Λάμπρου", rank: "Σημαιοφόρος", serviceNumber: "PN003", phone: "6900000003", email: "nl@example.com", unit: "ΔΔΜΝ" }
    ]);

    const res = await request(app)
      .get("/api/stats/personnel-by-unit")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.some(item => item.name === "ΣΝΔ" && item.value === 2)).toBe(true);
    expect(res.body.some(item => item.name === "ΔΔΜΝ" && item.value === 1)).toBe(true);
  });

  test("GET /stats/training-participation - με δεδομένα", async () => {
    await Training.create([
      { description: "Βασική Εκπαίδευση", location: "ΚΕ Πόρος", from_date: "2025-08-01", to_date: "2025-08-10", personnel: [], success_rate: 75 },
      { description: "Βασική Εκπαίδευση", location: "ΚΕ Πόρος", from_date: "2025-08-11", to_date: "2025-08-20", personnel: [], success_rate: 65 }
    ]);

    const res = await request(app)
      .get("/api/stats/training-participation")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("training", "Βασική Εκπαίδευση");
    expect(res.body[0]).toHaveProperty("participants");
    expect(res.body[0]).toHaveProperty("averageScore");
  });
});