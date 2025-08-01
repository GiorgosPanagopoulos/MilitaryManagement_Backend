const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Training = require("../models/TrainingRecord");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

let mongoServer;
let adminToken;
let trainingId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(mongoServer.getUri());

  const admin = await User.create({
    email: "admin@milman.local",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  });

  adminToken = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET || "secret");

  const training = await Training.create({
    description: "Βασική Εκπαίδευση",
    location: "ΚΕ Πόρος",
    from_date: "2025-08-01",
    to_date: "2025-08-10",
    personnel: [],
  });

  trainingId = training._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("📚 Training API", () => {
  test("GET /api/training - επιστρέφει εκπαιδεύσεις", async () => {
    const res = await request(app)
      .get("/api/training")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("description");
  });

  test("PUT /api/training/:id - ενημερώνει εκπαίδευση", async () => {
    const res = await request(app)
      .put(`/api/training/${trainingId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        description: "Ενημερωμένη Εκπαίδευση",
        location: "ΣΝΔ",
        from_date: "2025-08-05",
        to_date: "2025-08-15",
        personnel: [],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe("Ενημερωμένη Εκπαίδευση");
  });

  test("DELETE /api/training/:id - διαγράφει εκπαίδευση", async () => {
    const toDelete = await Training.create({
      description: "Διαγραφή Εκπαίδευσης",
      location: "ΚΕ Χανίων",
      from_date: "2025-08-01",
      to_date: "2025-08-05",
      personnel: [],
    });

    const res = await request(app)
      .delete(`/api/training/${toDelete._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("εκπαίδευση");
  });

  test("POST /api/training - αποτυγχάνει όταν οι ημερομηνίες είναι λάθος", async () => {
    const res = await request(app)
      .post("/api/training")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        description: "Μη έγκυρη Εκπαίδευση",
        location: "ΣΔΑΜ",
        from_date: "2025-08-10",
        to_date: "2025-08-01", // from > to
        personnel: [],
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
