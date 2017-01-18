const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Product end points", () => {
  'use strict';

  let id;

  it("should respond with an array of products", (done) => {
    api.get("/api/products")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it("create a new Product", (done) => {
    api.post("/api/products")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      ancestors: ["green tomato"],
      title: "This",
      pageTitle: "new realese",
      description: "2016 model",
      vendor: "admin",
      price: {
        "range": "89 - 67",
        "min": "67",
        "max": "89"
      },
      isLowQuantity: "true",
      isSoldOut: "false",
      templateSuffix: "latest",
      publishedScope: "shop"
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

  it("should get a single product", (done) => {
    api.get("/api/products/"+id)
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

  it("should update a product", (done) => {
    api.put("/api/products/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      isBackorder: "false",
      isSoldOut: "true"
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

  it("should delete an product", (done) => {
    api.delete("/api/products/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    //expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Product deleted successfully");
      done();
    });
  });

});
