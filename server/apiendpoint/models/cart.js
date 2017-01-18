const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductVariant = require("./product").ProductVariant;
const Shipment = require("./shipping").ShipmentObject;
const Workflow = require("./workflow").Workflow;
const Payment = require("./payment").Payment;


const CartItem = {
  productId: String,
  shopId: String,
  quantity: Number,
  variants: ProductVariant,
  title: String,
  type: String,
  cartItemId: String
};

exports.CartItems = {
  items: [CartItem]
};

const CartSchema = new Schema({
  shopId: {
    type: String
  },
  userId: {
    type: String
  },
  sessionId: {
    type: String
  },
  email: {
    type: String
  },
  items: {
    type: [CartItem]
  },
  shipping: [Shipment],
  billing: [Payment],
  tax: {
    type: Number,
    required: false
  },
  taxes: {
    type: [Object],
    required: false
  },
  workflow: Workflow,
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

CartSchema.pre("save", (next) => {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

exports.Cart = mongoose.model("Cart", CartSchema, "Cart");
