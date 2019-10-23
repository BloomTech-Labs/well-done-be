const request = require("supertest");
const Pumps = require("../pumps/pumps.model");
const db = require("../../data/dbConfig");
require("dotenv").config();

describe("pumps router", () => {
  beforeEach(async () => {
    await db("pumps").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  //   describe("insert()", () => {
  //     it("should insert pumps into the db", async () => {
  //       await Pumps.insert({ org_name: "Org", headquarter_city: "HQ" });
  //       let org = await db("pumps");
  //       expect(org).toHaveLength(1);
  //     });

  //     it("should insert an org into the db", async () => {
  //       const { id } = await Organizations.insert({
  //         org_name: "Org",
  //         headquarter_city: "HQ"
  //       });
  //       console.log("id", id);
  //       let org = await db("organizations")
  //         .where({ id })
  //         .first();
  //       //   console.log(org);
  //       expect(org.org_name).toBe("Org");
  //     });
  //   });
});
