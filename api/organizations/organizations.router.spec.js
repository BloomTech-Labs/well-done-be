const request = require("supertest");
const server = require("../server");
const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");

// ALL TESTS PASSING :)
describe("organizations router", () => { 
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
});

afterAll(async () => {
  await db("accounts").truncate();
});
beforeAll(async () => {
  await db("accounts").truncate();
});
beforeAll(async () => {
  await db("organizations").truncate();
});
afterAll(async () => {
  await db("organizations").truncate();
});
let token;
beforeAll((done) => {
  request(server)
    .post('/api/accounts')
    .send({
      first_name: "firstName",
      last_name: "lastName",
      email_address: "email",
      password: bcrypt.hashSync('password', 2), 
      super_user: true,
      org_admin: false,
      org_user: false
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});
//Test POST an org
describe("POST /api/orgs", function() {
  let org = {
    org_name: "ABC",
    headquarter_city: "DEF"
  };
  it("respond with 200 created", function(done) {
    request(server)
      .post("/api/orgs")
      .send(org)
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
//Test GET all orgs
describe("GET /api/orgs", function() {
  it("respond with json containing a list of all orgs", function(done) {
    request(server)
      .get("/api/orgs")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
//Test GET org by id
describe("GET /api/orgs/:id", function() {
  it("respond with json containing a single org", function(done) {
    request(server)
      .get("/api/orgs/1")
      .set("Accept", "application/json")
      .set("Authorization", `${token}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("respond with json org not found", function(done) {
    request(server)
      .get("/api/orgs/notaproperid")
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
