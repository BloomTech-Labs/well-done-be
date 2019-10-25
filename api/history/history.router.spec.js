const request = require("supertest");
const db = require("../../data/dbConfig");
const server = require('../server')

describe("history router", () => {
  beforeEach(async () => {
    await db("history").truncate();
  });
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

    it("should return 200 OK status", ()=> {
        return request(server)
        .get("/api/history")
        .then(res => {
          //console.log(res.status)
            expect(res.status).toEqual(200)
        })
    })
})

