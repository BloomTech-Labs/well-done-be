const request = require("supertest");
const server = require("../server");
const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");
// ALL TESTS PASSING :))
describe("accounts.router.js", () => {
<<<<<<< HEAD
  afterAll(async () => {
    await db("accounts").truncate();
  });
  // beforeAll(async () => {
  //   await db("accounts").truncate();
  // });
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
        console.log(response.body, "this is the response")
        token = response.body.token; // save the token!
        console.log(token, "this is the token")
        done();
      });
  });

  describe("GET /api/accounts", () => {
    it("should return 200 OK status", () => {
      return request(server)
        .get("/api/accounts")
        .set("Accept", "application/json")
        .set("Authorization", `${token}`)
        .then(res => {
          console.log(res.body)
          expect(res.status).toEqual(200);
        });
    });
    it("should return JSON format", async () => {
      const response = await request(server).get("/api/accounts");
      expect(response.type).toEqual("application/json");
    });
    //Test POST an account
    // describe("POST /api/accounts", function() {
    //   let account = {
    //     first_name: "Smith",
    //     last_name: "McGee2",
    //     email_address: "abc@email.comunique",
    //     password: bcrypt.hashSync('password', 2),
    //     mobile_number: "1-888-888-88889777766",
    //     super_user: 0,
    //     org_user: 1,
    //     org_admin: 1
    //   };
    //   it("respond with 200 created", function(done) {
    //     request(server)
    //       .post("/api/accounts")
    //       .send(account)
    //       .set("Accept", "application/json")
    //       .set("Authorization", `${token}`)
    //       .expect("Content-Type", /json/)
    //       .expect(200)
    //       .end(err => {
    //         if (err) return done(err);
    //         done();
    //       });
    //   });
    // });
    //Test GET all accounts
    describe("GET /api/accounts", function() {
      it("respond with json containing a list of all accounts", function(done) {
        request(server)
          .get("/api/accounts")
          .set("Accept", "application/json")
          .set("Authorization", `${token}`)
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
          .set("Authorization", `${token}`)
          .expect("Content-Type", /json/)
          .expect(200, done);
      });
      it("respond with json account not found", function(done) {
        request(server)
          .get("/api/accounts/notaproperid")
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
  });
  // afterAll(async () => {
  //   await db("accounts").truncate();
  // });
});
