const request = require("supertest");
const Auth = require("../api/auth/auth.model");
const Accounts = require("../api/accounts/accounts.model");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const server = require("../api/server.js");

describe("accounts model", () => {
  beforeEach(async () => {
    await db("accounts").truncate();
  });

  it("should set environment to test", () => {
    expect(process.env.DB_ENV).toBe("test");
  });

  describe("insert()", () => {
    it("should insert account record into the db", async () => {
      await Auth.insert({
        first_name: "Jack",
        last_name: "Sparrow",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });

      let accounts = await db("accounts");
      expect(accounts).toHaveLength(1);
    });

    it("should insert account record into the db", async () => {
      await Auth.insert({
        first_name: "Jackie",
        last_name: "Rabbit",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email1@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });

      let account = await db("accounts")
        .where({ id })
        .first();
      expect(account.first_name).toBe("Jackie");
    });

    it("should add an account and log the user into the db", async () => {
      let { id } = await Auth.insert({
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
      expect(account.last_name).toBe("Bugs");
    });

    it("should add an account, login a user, return a list of accounts from db and check length", async () => {
      await Auth.insert({
        first_name: "Jackie",
        last_name: "Rabbit",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email1@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      await Auth.insert({
        first_name: "Bugs",
        last_name: "Bunny",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email2@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      await Auth.insert({
        first_name: "Jack",
        last_name: "Sparrow",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });

      let accounts = await Accounts.find();
      expect(accounts).toHaveLength(3);
    });

    it("should add an account, login a user, return a list of users from db and assert email_address", async () => {
      await Auth.insert({
        first_name: "Jackie",
        last_name: "Rabbit",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email1@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      await Auth.insert({
        first_name: "Bugs",
        last_name: "Bunny",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email2@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });
      await Auth.insert({
        first_name: "Jack",
        last_name: "Sparrow",
        password: bcrypt.hashSync("icecream", 2),
        email_address: "email@email.com",
        mobile_number: "555-555-5555",
        super_user: true,
        org_admin: false,
        org_user: false
      });

      let accounts = await Accounts.find();
      expect(accounts[0].email_address).toEqual("email1@email.com");
      expect(accounts[1].email_address).toEqual("email2@email.com");
      expect(accounts[2].email_address).toEqual("email@email.com");
    });
  });
});
