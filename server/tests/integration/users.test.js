const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../src/app");
const User = require("../../src/models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.username).toBe("testuser");
    expect(res.body.email).toBe("test@example.com");
  });

  it("should not register with missing fields", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ username: "testuser", email: "" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("should not register duplicate user", async () => {
    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    const res = await request(app).post("/api/users/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("error");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });
  });

  it("should login with correct username and password", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "password123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.username).toBe("testuser");
  });

  it("should login with correct email and password", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "wrongpass" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  it("should not login with missing fields", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
