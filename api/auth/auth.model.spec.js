const request = require("supertest");
const Auth = require("./auth.model");
const Accounts = require("../accounts/accounts.model");
const db = require("../../data/dbConfig");
const bcrypt = require("bcryptjs");

describe("accounts model", () => {
  beforeEach(async () => {
    await db("accounts").truncate();
  });

  it("should set environment to testing", () => {
    expect(process.env.DB_ENV).toBe("test");

  });

  describe("insert()", () => {
    beforeEach(async () => {
      await db('accounts').truncate();
    });

    it("should insert account record into the db", async () => {
      await Accounts.insert({
        org_id: 1,
	      first_name:"Hong5555555",
	      last_name: "Trann",
	      email_address: "abc22333@gmail.comnddddd",
	      password: "abdddr",
	      mobile_number: "677-773-333387",
	      super_user: true,
	      org_user: false,
	      org_admin: false
      });

      const accounts = await db('accounts');
      expect(accounts).toHaveLength(1);
    });

    // it("should insert account record into the db", async () => {
    //   await Accounts.insert({
    //     org_id: 1,
    //     first_name: "Jacka",
    //     last_name: "Rabbit",
    //     email_address: "new22@email.com",
    //     password: bcrypt.hashSync("icecream", 2),
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_user: false,
    //     org_admin: false
    //   });

    //   let accounts = await Auth.findBy({
    //     first_name: "Jacka"
    //   }).first();
    //   expect(accounts.first_name).toBe("Jackie");
    // });

    // it("should add an account and log the user into the db", async () => {
    //   await Accounts.insert({
    //     org_id: 1,
    //     first_name: "Bugs",
    //     last_name: "Bunny",
    //     email_address: "new32@email.com",
    //     password: bcrypt.hashSync("icecream", 2),
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_user: false,
    //     org_admin: false
        
    //   });
    //   let accounts = await Auth.findBy({
    //     email_address: "baba3334@email.com"
    //   }).first();
    //   expect(accounts.last_name).toBe("Bunny");
    // });

    // it("should add an account, login a user, return a list of accounts from db and check length", async () => {
    //   await Accounts.insert({
    //     first_name: "Jackie",
    //     last_name: "Rabbit",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email3@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });
    //   await Accounts.insert({
    //     first_name: "Bugs",
    //     last_name: "Bunny",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email4@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });
    //   await Accounts.insert({
    //     first_name: "Jack",
    //     last_name: "Sparrow",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email5@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });

    //   let accounts = await Accounts.find();
    //   expect(accounts).toHaveLength(3);

    // });

    // it("should add an account, login a user, return a list of users from db and assert email_address", async () => {
    //   await Accounts.insert({
    //     first_name: "Jackie",
    //     last_name: "Rabbit",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email6@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });
    //   await Accounts.insert({
    //     first_name: "Bugs",
    //     last_name: "Bunny",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email7@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });
    //   await Accounts.insert({
    //     first_name: "Jack",
    //     last_name: "Sparrow",
    //     password: bcrypt.hashSync("icecream", 2),
    //     email_address: "email8@email.com",
    //     mobile_number: "555-555-5555",
    //     super_user: true,
    //     org_admin: false,
    //     org_user: false
    //   });

    //   let accounts = await Accounts.find();
    //   expect(accounts[0].email_address).toEqual("email6@email.com");
    //   expect(accounts[1].email_address).toEqual("email7@email.com");
    //   expect(accounts[2].email_address).toEqual("email8@email.com");
    // });
  });
});
