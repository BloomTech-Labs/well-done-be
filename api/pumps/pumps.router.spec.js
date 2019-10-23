const request = require("supertest");
<<<<<<< HEAD
const Pumps = require("../pumps/pumps.model");
=======
const Pumps = require("./pumps.model");
>>>>>>> 518777504831129b863c9d0f9d966a6f7c2c103d
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

// const request = require("supertest");
// const Pumps = require("../pumps/pumps.model.js");
// const db = require("../../data/dbConfig");

// describe("pumps model", () => {
//   beforeEach(async () => {
//     await db("pumps").truncate();
//   });
// })
//   it("should set environment to testing", () => {
//     expect(process.env.DB_ENV).toBe("testing");
//   });

//   describe("insert()", () => {
//     it("should insert pumps into the db", async () => {
      // insert a record
//       await Pumps.insert({
//         organization_name: "FAKE PUMP"
//       });
//       await Pump.insert({ headquarter_city: "TEST Delivery, LLC" });

//       let organizations = await db("pumps");

//       // assert the record was inserted
//       expect(organizations).toHaveLength(2);
//     });

//     it("should insert organizations into the db", async () => {
//       // insert a record
//       const [id] = await Organizations.insert({ name: "Test Org" });

//       let organization = await db("organizations")
//         .where({ id })
//         .first();

//       // assert the record was inserted
//       expect(organization.name).toBe("Test Org");
//     });
//   });
// });
