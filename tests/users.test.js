const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

let mongoServer;
let adminToken;
let userToken;
let adminId;
let userId;

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

  const user = await User.create({
    email: "user@example.com",
    password: await bcrypt.hash("user123", 10),
    role: "user",
  });

  adminId = admin._id.toString();
  userId = user._id.toString();

  adminToken = jwt.sign({ id: adminId, role: "admin" }, process.env.JWT_SECRET || "secret");
  userToken = jwt.sign({ id: userId, role: "user" }, process.env.JWT_SECRET || "secret");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const users = await User.find({ email: { $nin: ["admin@milman.local", "user@example.com"] } });
  for (let u of users) await u.deleteOne();
});

describe("🧪 User routes", () => {
  test("POST /api/users - δημιουργία νέου χρήστη από admin", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        email: "newuser@example.com",
        password: "123456",
        role: "user",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Ο χρήστης δημιουργήθηκε επιτυχώς");
  });

  test("GET /api/users - λήψη όλων των χρηστών (admin)", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/users/:id - ενημέρωση email", async () => {
    const userToUpdate = await User.create({
      email: "toedit@example.com",
      password: await bcrypt.hash("123456", 10),
      role: "user",
    });

    const res = await request(app)
      .put(`/api/users/${userToUpdate._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "updated@example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("updated@example.com");
  });

  test("PUT /api/users/:id/role - ενημέρωση ρόλου", async () => {
    const newUser = await User.create({
      email: "changerole@example.com",
      password: await bcrypt.hash("123456", 10),
      role: "user",
    });

    const res = await request(app)
      .put(`/api/users/${newUser._id}/role`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ role: "admin" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.role).toBe("admin");
  });

  test("DELETE /api/users/:id - διαγραφή χρήστη", async () => {
    const toDelete = await User.create({
      email: "todelete@example.com",
      password: await bcrypt.hash("123456", 10),
      role: "user",
    });

    const res = await request(app)
      .delete(`/api/users/${toDelete._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ο χρήστης διαγράφηκε");
  });
});
