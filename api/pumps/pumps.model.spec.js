const db = require("../../data/dbConfig");
const Pumps = require("./pumps.model");

// ALL TESTS PASSING :)
describe("pumps model", () => {
  beforeEach(async () => {
    await db("pumps").truncate();
  });
  describe("insert()", () => {
    it("should insert the provided pumps into the db", async () => {
      await Pumps.addPump({
        org_id: 1,
        country_name: "Cambodiasssddd",
        province_name: "A province",
        district_name: "B district",
        commune_name: "C commune",
        latitude: 1.234,
        longitude: 2.345
      });
      await Pumps.addPump({
        org_id: 2,
        country_name: "Country",
        province_name: "B province",
        district_name: "C district",
        commune_name: "D commune",
        latitude: 10.234,
        longitude: 200.345
      });

      const pumps = await db("pumps");
      expect(pumps).toHaveLength(2);
      expect(pumps[0].country_name).toBe("Cambodiasssddd");
      expect(pumps[0].latitude).toBe(1.234);
      expect(pumps[1].org_id).toBe(2);
      expect(pumps[1].commune_name).toBe("D commune");
    });
  });
});
