const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");
const users = require("./user_seed");

const run_seeder = (seeds, callback) => {

};

describe("Account end points", () => {

  'use strict';
  let id;
  let seed_id;

  before((done) => {
    api.post("/api/accounts")
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("Accept", "application/json")
      .send({
        email: users.email,
        password: users.password
      })
      .end((err, res) => {
        seed_id = res.body.account._id;
        done();
      });
  });

  it("should respond with an array of accounts", (done) => {
    api.get("/api/accounts")
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.equal(true);
        done();
      });
  });

  it("create a new account", (done) => {
    api.post("/api/accounts")
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .send({
        email: "testuates@account.com",
        password: "12345"
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(typeof (res.body)).to.equal("object");
        expect(res.body).to.have.property("token");
        id = res.body.account._id;
        done();
      });
  });

  it("should get a single account", (done) => {
    api.get("/api/accounts/" + id)
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(typeof (res.body)).to.equal('object');
        expect(res.body._id).to.equal(id);
        done();
      });
  });

  it("should update an account", (done) => {
    api.put("/api/accounts/" + id)
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .send({
        acceptsMarketing: "false",
        state: "old"
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("updated successfully");
        done();
      });
  });

  it("should delete an account", (done) => {
    api.delete("/api/accounts/" + id)
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("Account deleted successfully");
        done();
      });
  });

  after((done) => {
    api.delete("/api/accounts/" + seed_id)
      .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
      .set("x-user-id", "K54okcMXiPvuzrFeg")
      .set("Accept", "application/json")
      .end((err, res) => {
        done();
      });
  });
});
