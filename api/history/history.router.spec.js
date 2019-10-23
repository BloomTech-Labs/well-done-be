const request = require("supertest");
const db = require("../../data/dbConfig");
const History = require("./history.model")

describe("history router", () => {
  beforeEach(async () => {
    await db("history").truncate();
  });
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  it("gets the history endpoint", async done => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    done();
  });
});
