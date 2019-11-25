const request = require("supertest");
const server = require("../server");
const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");
// ALL TESTS PASSING :) 
describe("sensors router", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
});

beforeAll(async () => {
  await db("sensors").truncate();
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
//Test POST a sensor
describe("POST /api/sensors", function() {
 
  let sensor = {
    physical_id: 12325,
    kind: "B",
    type: "A",
    cellular: 1,
    bluetooth: 1,
    training: "training",
    remark: "good tests",
    data_finished: "2018-11-02",
    depth: 221,
    yield: 21,
    static: 1,
    quality: "fair"
  };
  it("respond with 200 created", function(done) {
    request(server)
      .post("/api/sensors")
      .send(sensor)
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(201)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
//Test GET all sensors
describe("GET /api/sensors", function() {
  it("respond with json containing a list of all sensors", function(done) {
    request(server)
      .get("/api/sensors")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
//Test GET sensor by id
describe("GET /api/sensors/:id", function() {
  jest.setTimeout(60000)
  it("respond with json containing a single pump", function(done) {
    request(server)
      .get("/api/sensors/1")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("respond with json sensor not found", function(done) {
    request(server)
      .get("/api/sensors/notaproperid")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
