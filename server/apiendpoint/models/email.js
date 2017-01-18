const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  html: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  jobId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

emailSchema.pre("save", (next) => {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Email", emailSchema, "Emails");
