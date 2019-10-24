const request = require("supertest");
const Sensors = require("./sensors.model");
const db = require("../../data/dbConfig");
require("dotenv").config();

describe("sensors router", () => {
  beforeEach(async () => {
    await db("sensors").truncate();
  });

  it("should set environment to test", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  describe("addSensor()", () => {
    it("should add a sensor into the db", async () => {
      await Sensors.addSensor({
        pump_id: 1,
        physical_id: 12325,
        kind: "B",
        type: "A",
        cellular: 1,
        bluetooth: 1,
        training: "training",
        remark: "good tests",
        data_finished: "2018-11-02",
        depth: 221,
        yield: 21,
        static: 1,
        quality: "fair"
      });
      let sensor = await db("sensors");
      expect(sensor).toHaveLength(1);
    });
  });
});
