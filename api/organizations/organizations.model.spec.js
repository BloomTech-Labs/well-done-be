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

  describe("insert()", () => {
    it("should insert organizations into the db", async () => {
      // insert a record
      await Organizations.insert({
        org_name: "TEST Sensor Delivery, LLC",
        headquarter_city: "TEST Delivery, LLC"
      });

      let organizations = await db("organizations");

      // assert the record was inserted
      expect(organizations).toHaveLength(1);
    });

    // it("should insert organizations into the db", async () => {
    //   // insert a record
    //   const [id] = await Organizations.insert({ name: "Test Org" });

    //   let organization = await db("organizations")
    //     .where({ id })
    //     .first();

    //   // assert the record was inserted
    //   expect(organization.name).toBe("Test Org");
    // });
  });
});
