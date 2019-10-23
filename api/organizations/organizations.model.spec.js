// const knex = require("knex");
// const config = require("../../knexfile");
// const db = knex(config.development);
const Organizations = require("./organizations.model");
const db = require("../../data/dbConfig");

describe("organizations model", () => {
  beforeEach(async () => {
    await db("organizations").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  // describe("insert()", () => {
  //   it("should insert organizations into the db", async () => {
  //     // insert a record
  //     await Organizations.insert({
  //       org_name: "TEST Sensor Delivery, LLC"
  //     });
  //     await Organizations.insert({ headquarter_city: "TEST Delivery, LLC" });

  //     let organizations = await db("organizations");

  //     // assert the record was inserted
  //     expect(organizations).toHaveLength(2);
  //   });

  //   it("should insert organizations into the db", async () => {
  //     // insert a record
  //     const [id] = await Organizations.insert({ org_name: "Test Org" });

  //     let organization = await db("organizations")
  //       .where({ id })
  //       .first();

  //     // assert the record was inserted
  //     expect(organization.org_name).toBe("Test Org");
  //   });
  // });

  describe("insert()", () => {
    it("should insert organizations into the db", async () => {
      await Organizations.insert({ 
        org_name: "ABC", 
        headquarter_city: "HQ" });
      let org = await db("organizations");
      expect(org).toHaveLength(1);
    });

    it("should insert an org into the db", async () => {
      const { id } = await Organizations.insert({
        org_name: "Org",
        headquarter_city: "HQ"
      });
      console.log("id", id);
      let org = await db("organizations")
        .where({ id })
        .first();
      //   console.log(org);
      expect(org.org_name).toBe("Org");
    });
  });
});
