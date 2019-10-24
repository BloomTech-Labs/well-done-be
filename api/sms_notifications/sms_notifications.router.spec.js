const request = require("supertest");
const server = require("../server");

// ALL TESTS PASSING :)

describe("sms router", () => {
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
});
//Test POST an sms
describe("POST /api/sms_notifications", function() {
  let sms = {
    mobile_number: "774-290-3807",
    org_id: 1,
    status: 1
  };
  it("respond with 200 created", function(done) {
    request(server)
      .post("/api/sms_notifications")
      .send(sms)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
//Test GET all sms
describe("GET /api/sms_notifications", function() {
  it("respond with json containing a list of all sms", function(done) {
    request(server)
      .get("/api/sms_notifications")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
//Test GET sms by id
describe("GET /api/sms_notifications/:id", function() {
  it("respond with json containing a single sms", function(done) {
    request(server)
      .get("/api/sms_notifications/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  it("respond with json sms not found", function(done) {
    request(server)
      .get("/api/sms_notifications/notaproperid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
