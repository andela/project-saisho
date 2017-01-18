const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Cart end point", () => {
  'use strict';

  let id;
  it("should respond with an array of carts", (done) => {
    api.get("/api/carts")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it("create a new cart", (done) => {
    api.post("/api/carts")
    .set("Accept", "application/json")
    .send({
      sessionId: "Tbgv568grEG78b",
      email: "admin@host.com",
      items: ["Gold", "Gucci"],
      tax: 67
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

  it("should get a single cart", (done) => {
    api.get("/api/carts/" + id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal('object');
      expect(res.body._id).to.equal(id);
      done();
    });
  });

  it("should update a cart", (done) => {
    api.put("/api/carts/")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      tax: 50
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

  it("should delete cart", (done) => {
    api.delete("/api/carts/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Cart deleted successfully");
      done();
    });
  });

});
