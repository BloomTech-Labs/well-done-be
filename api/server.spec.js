const request = require("supertest");

const server = require("./server");
// No 🌴
// TESTS DONE. ADD more tests ONLY after other files have tests.

describe("server.js", () => {
  describe("GET /", () => {
    it("should return 200 OK status", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it("should return Welcome to the Jungle", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual(`Welcome to the Jungle`);
    });

    it("returns JSON", done => {
      request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});

describe("server.js", () => {
  describe("GET /", () => {
    it("should return status 200", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object with right content", async () => {
      const expectedBody = "Welcome to the Jungle";
      const response = await request(server).get("/");
      expect(response.body).toEqual(expectedBody);
    });

    it("should return JSON format", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
    });
  });
});




