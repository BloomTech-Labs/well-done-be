// const request = require("supertest");

// const Pumps = require("../pumps/pumps.model.js");
// const db = require("../../data/dbConfig.js");

// describe("pumps model", () => {
//   beforeEach(async () => {
//     await db("pumps").truncate();
//   });

//   it("should set environment to testing", () => {
//     expect(process.env.DB_ENV).toBe("testing");
//   });

//   describe("insert()", () => {
//     it("should insert pumps into the db", async () => {
//       // insert a record
//       await Organizations.insert({
//         organization_name: "FAKE PUMP"
//       });
//       await Organizations.insert({ headquarter_city: "TEST Delivery, LLC" });

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
