const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Orders end points", () => {
  'use strict';
  let id;

  it("should respond with an array of orders", (done) => {
    api.get("/api/orders")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it("create a new order", (done) => {
    api.post("/api/orders")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      cartId: "ypZADYnw2SovGbTZq",
       history: [{
         "event": "today",
         "userId": "Fvkuy79hbhtTt"
         },
         {
           "event": "gross",
           "userId": "Fvkuy79hbhtTt"
         }],
        documents: [{
          "docId": "67",
          "docType": "reciept"
        }],
        items: [
          {
            "additionalField": "none",
            history: [{
              "event": "today",
              "userId": "Fvkuy79hbhtTt"
              },
              {
                "event": "gross",
                "userId": "Fvkuy79hbhtTt"
              }]
          }
        ]
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

  it("should get a single orders", (done) => {
    api.get("/api/orders/"+id)
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

  it("should update an orders", (done) => {
    api.put("/api/orders/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      documents: [{
        "title": "i change stuff",
        "body": "another blaa"
      }]
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

  it("should delete an orders", (done) => {
    api.delete("/api/orders/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Order deleted successfully");
      done();
    });
  });

});
