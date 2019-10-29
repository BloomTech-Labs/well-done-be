const request = require("supertest");
const Sensors = require("./sensors.model");
const db = require("../../data/dbConfig");

// ALL TESTS PASSING :)
describe("sensors model", () => {
  beforeEach(async () => {
    await db("sensors").truncate();
  });
  describe("insert()", () => {
    it("should insert the provided pumps into the db", async () => {
      await Sensors.addSensor({
        pump_id: 2,
        physical_id: 222444,
        kind: "kkkk",
        type: "kkkk",
        cellular: 333444,
        bluetooth: 333444,
        training: "kkk",
        remark: "kk",
        data_finished: "2019-10-20",
        depth: 222222,
        yield: 22222222,
        static: 21113222,
        quality: "gooddd"
      });
      await Sensors.addSensor({
        pump_id: 1,
        physical_id: 33334,
        kind: "kind",
        type: "type",
        cellular: 1,
        bluetooth: 1,
        training: "training",
        remark: "remark",
        data_finished: "2018-11-21",
        depth: 1111,
        yield: 11111,
        static: 1111,
        quality: "great"
      });
      const sensors = await db("sensors");
      expect(sensors).toHaveLength(2);
      expect(sensors[0].physical_id).toBe(222444);
      expect(sensors[0].data_finished).toBe("2019-10-20");
      expect(sensors[1].cellular).toBe(1);
      expect(sensors[1].quality).toBe("great");
    });
  });
});
