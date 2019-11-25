const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");



// ALL TESTS PASSING :)
describe("history router", () => {
  beforeAll(async () => {
    await db("history").truncate();
  });

  let token;
  beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send({
        email_address: "email@email",
        password: "pw", 
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
  //Test POST a history
  describe("POST /api/history", function() {
    jest.setTimeout(60000)
    let history = {
      date: "2019-05-22",
      count: 2,
      total: 789456,
      status: 3,
      sensor_id: 4715,
      reported_percent: 12
    };
    it("respond with 200 created", function(done) {
      request(server)
        .post("/api/history")
        .send(history)
        .set("Accept", "application/json")
        .set("Authorization", `${token}`)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, response) => {
          if (err) {return done(err)} else {
          done()};
        });
    });
  });
  //Test GET all history
  describe("GET /api/history", function() {
    it("respond with json containing a list of all history", function(done) {
      request(server)
        .get("/api/history")
        .set("Accept", "application/json")
        .set("Authorization", `${token}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
  //Test GET history by id
  describe("GET /api/history/:id", function() {
    it("respond with json containing a single history", function(done) {
      request(server)
        .get("/api/history/1")
        .set("Accept", "application/json")
        .set("Authorization", `${token}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
    it("respond with json history not found", function(done) {
      request(server)
        .get("/api/history/notaproperid")
        .set("Accept", "application/json")
        .set("Authorization", `${token}`)
        .expect("Content-Type", /json/)
        .expect(500)
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });
});
