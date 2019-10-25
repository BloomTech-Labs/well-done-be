const request = require("supertest");
const Auth = require("./auth.model");
const Accounts = require("../accounts/accounts.model");
const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");
// ALL TESTS PASSING :)
describe("accounts model", () => {
  beforeEach(async () => {
    await db("accounts").truncate();
  });
  it("should set environment to test", () => {
    expect(process.env.DB_ENV).toBe("test");
  });
  describe("insert()", () => {
    beforeEach(async () => {
      await db('accounts').truncate();
    });

    it("should insert account record into the db", async () => {
      await Accounts.insert({
        first_name: "Jack",
        last_name: "Sparrow",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "jack@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      let accounts = await db("accounts");
      expect(accounts).toHaveLength(1);
      expect(accounts[0].first_name).toBe("Jack");
    });
    it("should insert account record into the db", async () => {
      await Accounts.insert({
        first_name: "Jackie",
        last_name: "Rabbit",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email1@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      let account = await Auth.findBy({
        first_name: "Jackie"
      }).first();
      expect(account.first_name).toBe("Jackie");
    });
    it("should add an account and log the user into the db", async () => {
      await Accounts.insert({
        first_name: "Bugs",
        last_name: "Bunny",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email2@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      let account = await Auth.findBy({
        email_address: "email2@email.com"
      }).first();
      expect(account.last_name).toBe("Bunny");
    });
  });
});
