const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Shop end points", () => {
  'use strict';
  let id;

  it("should respond with an array of shops", (done) => {
    api.get("/api/shops")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it("create a new shop", (done) => {
    api.post("/api/shops")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      name: "Test shop",
      description: "We sell Gold and Gucci",
      keywords: "Glitter",
      addressBook: [
        {
          fullName: "2/4 funsho street",
          address1: "yaba",
          city: "lagos",
          phone: "789-098-899",
          region: "Africa",
          country: "Nigeria",
          isCommercial: "true"
        },
        {
          fullName: "55 moleye street",
          address1: "yaba",
          city: "lagos",
          phone: "789-098-899",
          region: "Africa",
          country: "Nigeria",
          isCommercial: "true"
        }
      ],
      domains: ["yahoo"],
      emails: [
        {
          address: "demi@gmail.com",
          verified: "true"
        },
        {
          address: "lade@gmail.com"
        },
      ]
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

  it("should get a single shops", (done) => {
    api.get("/api/shops/"+id)
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

  it("should update a shop", (done) => {
    api.put("/api/shops/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      domains: "gmail",
      emails: "3hrbh4n6JiJ78"
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

  it("should delete a shop", (done) => {
    api.delete("/api/shops/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Shop deleted successfully");
      done();
    });
  });

});
