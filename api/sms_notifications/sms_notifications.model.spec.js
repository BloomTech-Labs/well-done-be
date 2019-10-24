const request = require("supertest");
const SMS = require("./sms_notifications.model");
const db = require("../../data/dbConfig");

// ALL TESTS PASSING :)
describe("sms_notifications model", () => {
  beforeEach(async () => {
    await db("sms_notifications").truncate();
  });
  describe("insert()", () => {
    it("should insert the provided sms notifications into the db", async () => {
      await SMS.create({
        mobile_number: "111-111-1111",
        org_id: 1,
        status: 1
      });
      await SMS.create({
        mobile_number: "222-222-2222",
        org_id: 2,
        status: 1
      });
      const sms = await db("sms_notifications");
      expect(sms).toHaveLength(2);
      expect(sms[0].mobile_number).toBe("111-111-1111");
      expect(sms[0].org_id).toBe(1);
      expect(sms[1].mobile_number).toBe("222-222-2222");
      expect(sms[1].status).toBe(1);
    });
  });
});
