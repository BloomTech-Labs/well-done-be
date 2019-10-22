const request = require("supertest");

const Organizations = require("./organizations.model.js");
const db = require("../data/dbConfig.js");

describe("organizations model", () => {
  beforeEach(async () => {
    await db("organizations").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("insert()", () => {
    it("should insert organizations into the db", async () => {
      // insert a record
      await Organizations.insert({
        organization_name: "TEST Sensor Delivery, LLC"
      });
      await Organizations.insert({ headquarter_city: "TEST Delivery, LLC" });

      let organizations = await db("organizations");

      // assert the record was inserted
      expect(organizations).toHaveLength(2);
    });

    it("should insert organizations into the db", async () => {
      // insert a record
      const [id] = await Organizations.insert({ name: "Test Org" });

      let organization = await db("organizations")
        .where({ id })
        .first();

      // assert the record was inserted
      expect(organization.name).toBe("Test Org");
    });
  });
});
