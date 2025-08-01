const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

let mongoServer;
let validToken;
let expiredToken;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(mongoServer.getUri());

  const user = await User.create({
    email: "jwtuser@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "user",
  });

  userId = user._id;

  validToken = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "1h" });
  expiredToken = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: "-10s" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("🔐 JWT Authentication Tests", () => {
  test("✅ Access with valid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("protected");
  });

  test("❌ Access with missing token", async () => {
    const res = await request(app).get("/api/protected");

    expect([401, 403]).toContain(res.statusCode);
    expect(res.body.message.toLowerCase()).toMatch(/access token missing|invalid or expired token|access denied/);
  });

  test("❌ Access with invalid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer invalidtoken");

    expect(res.statusCode).toBe(403);
    expect(res.body.message.toLowerCase()).toContain("invalid or expired token");
  });

  test("❌ Access with expired token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message.toLowerCase()).toContain("invalid or expired token");
  });
});
