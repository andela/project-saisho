const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Email end points", () => {
  'use strict';
  let id;

  it("should respond with an array of emails", (done) => {
    api.get("/api/emails")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it("create a new email", (done) => {
    api.post("/api/emails")
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      to: "anemai@lhost.com",
      from: "another@host.com",
      subject: "the subject",
      text: "text part of the email",
      html: "<h1>still a text fields<h1>",
      jobId: "2rDBGETYUwr77nn",
      status: "Delieverd"
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

  it("should get a single email", (done) => {
    api.get("/api/emails/"+id)
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

  it("should update an email", (done) => {
    api.put("/api/emails/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
      text: "an updated Email text"
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

  it("should delete an email", (done) => {
    api.delete("/api/emails/"+id)
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Email deleted successfully");
      done();
    });
  });

});
