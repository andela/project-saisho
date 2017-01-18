const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Invoice = require("./payment").Invoice;
const Workflow = require("./workflow").Workflow;
const Address = require("./address").AddressObject;

const ShippingMethod = {
  "name": String,
  "label": String,
  "group": String,
  "cost": Number,
  "handling": Number,
  "rate": Number,
  "enabled": {
    type: Boolean,
    defaultValue: true
  },
  "validRanges": [],
  "validRanges.$": {
    type: Object
  },
  "validRanges.$.begin": {
    type: Number
  },
  "validRanges.$.end": {
    type: Number
  },
  "validLocales": {
    type: []
  },
  "validLocales.$": {
    type: Object
  },
  "validLocales.$.origination": {
    type: String
  },
  "validLocales.$.destination": {
    type: String
  },
  "validLocales.$.deliveryBegin": {
    type: Number
  },
  "validLocales.$.deliveryEnd": {
    type: Number
  }
};


const ShippingParcel = {
  containers: String,
  length: Number,
  width: Number,
  height: Number,
  weight: Number
};
exports.ShippingParcel = ShippingParcel;

const ShipmentItem = {
  productId: String,
  shopId: String,
  quantity: Number,
  variantId: String
};

const ShipmentQuote = {
  carrier: String,
  method: ShippingMethod,
  rate: {
    type: Number,
    default: 0
  }
};

const ShipmentObject = {
  paymentId: String,
  address: Address,
  shipmentMethod: ShippingMethod,
  shipmentQuotes: ShipmentQuote,
  traking: String,
  parcel: ShippingParcel,
  items: [ShipmentItem],
  workflow: Workflow,
  packed: {
    type: Boolean,
    default: false
  },
  shipped: {
    type: Boolean,
    default: false
  },
  invoice: Invoice,
  transactions: [Object]
};

exports.ShipmentObject = ShipmentObject;
