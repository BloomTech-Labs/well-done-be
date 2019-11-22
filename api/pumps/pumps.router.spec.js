const request = require("supertest");
const server = require("../server");
const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");

describe("pumps router", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
});
beforeAll(async () => {
  await db("pumps").truncate();
});
<<<<<<< HEAD
afterAll(async () => {
  await db("accounts").truncate();
});
// afterEach(() => {
//   delete global.__mobxInstanceCount; // prevent warnings
// })
=======

>>>>>>> 303a06ae9ffbd8a099b56676c1c7efad917e6320
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
//Test POST a pump
describe("POST /api/pumps", function() {
  let pump = {
    org_id: "1",
    country_name: "4th country",
    province_name: "4th province",
    district_name: "4th district",
    commune_name: "4th commune",
    latitude: "1.2345",
    longitude: "2.3456"
  };
  it("respond with 201 created", function(done) {
    request(server)
      .post("/api/pumps")
      .send(pump)
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
//Test GET all pumps
describe("GET /api/pumps", function() {
  it("respond with json containing a list of all pumps", function(done) {
    request(server)
      .get("/api/pumps")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
//Test GET pump by id
describe("GET /api/pumps/:id", function() {
  it("respond with json containing a single pump", function(done) {
    request(server)
      .get("/api/pumps/1")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("respond with json pump not found", function(done) {
    request(server)
      .get("/api/pumps/notaproperid")
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