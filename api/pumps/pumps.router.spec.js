const request = require("supertest");
const Pumps = require("./pumps.model");
const db = require("../../data/dbConfig");
require("dotenv").config();

describe("pumps router", () => {

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

})

