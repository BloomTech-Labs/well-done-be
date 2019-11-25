const request = require("supertest");
const server = require("../server");
const bcrypt = require("bcryptjs");
const db = require("../../data/dbConfig");
// ALL TESTS PASSING :))
describe("accounts.router.js", () => {
 
    beforeAll(async () => {
      await db("accounts").truncate();
    });
    let token;
    beforeAll((done) => {
      request(server)
        .post('/api/accounts')
        .send({
          first_name: "firstName",
          last_name: "lastName",
          email_address: "email@email",
          password: "pw", 
          super_user: true,
          org_admin: false,
          org_user: false
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
    })
})

