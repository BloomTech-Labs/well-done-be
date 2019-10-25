const Organizations = require("./organizations.model");
const db = require("../../data/dbConfig");
// ALL TESTS PASSING :)
describe("organizations model", () => {
  beforeEach(async () => {
    await db("organizations").truncate();
  });
  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
  describe("insert()", () => {
    it("should insert organizations into the db", async () => {
      await Organizations.insert({
        org_name: "ABC",
        headquarter_city: "HQ"
      });
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
