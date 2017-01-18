const Cart = require("./cart").Cart;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Workflow = require("./workflow").Workflow;
const users = require("./account").Users;

const History = {
  event: {
    type: String
  },
  userId: {
    type: String
  },
  updatedAt: {
    type: Date
  }
};

const Document = {
  docId: {
    type: String
  },
  docType: {
    type: String
  }
};

const Notes = {
  content: {
    type: String
  },
  userId: {
    type: String
  },
  updatedAt: {
    type: Date
  }
};

const OrderItem = {
  additionalField: {
    type: String
  },
  workflow: {
    type: Workflow
  },
  history: {
    type: [History]
  },
  documents: {
    type: [Document]
  }
};

const OrderTransaction = {
  itemId: {
    type: String
  },
  paymentId: {
    type: String
  },
  shipmentId: {
    type: String
  },
  inventoryId: {
    type: String
  },
  createdAt: {
    type: Date
  }
};

const OrderSchema = new Schema({
  userId: {
    type: String,
    ref: users
  },
  cartId: {
    type: String,
    ref: Cart
  },
  history: [History],
  documents: [Document],
  notes: [Notes],
  items: [OrderItem],
  transactions: [OrderTransaction]
});

exports.Orders = mongoose.model("Orders", OrderSchema, "Orders");
