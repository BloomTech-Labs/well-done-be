const request = require("supertest");
const server = require("../server");
// ALL TESTS PASSING :))
describe("accounts.router.js", () => {
  describe("GET /api/accounts", () => {
    it("should return 200 OK status", () => {
      return request(server)
        .get("/api/accounts")
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it("should return JSON format", async () => {
      const response = await request(server).get("/api/accounts");
      expect(response.type).toEqual("application/json");
    });
    //Test POST an account
    describe("POST /api/accounts", function() {
      let account = {
        id: "6",
        org_id: "2",
        first_name: "Smith",
        last_name: "McGee2",
        email_address: "abc@email.comunique",
        password: "test",
        mobile_number: "1-888-888-88889777766",
        super_user: 0,
        org_user: 1,
        org_admin: 1
      };
      it("respond with 200 created", function(done) {
        request(server)
          .post("/api/accounts")
          .send(account)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end(err => {
            if (err) return done(err);
            done();
          });
      });
    });
    //Test GET all accounts
    describe("GET /api/accounts", function() {
      it("respond with json containing a list of all accounts", function(done) {
        request(server)
          .get("/api/accounts")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
    });
    //Test GET account by id
    describe("GET /api/accounts/:id", function() {
      it("respond with json containing a single account", function(done) {
        request(server)
          .get("/api/accounts/1")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
      it("respond with json org not found", function(done) {
        request(server)
          .get("/api/accounts/notaproperid")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .end(err => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
