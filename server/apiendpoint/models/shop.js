const Email = require("./account").Email;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Layout = require("./layout").Layout;
const Metafield = require("./metafield").Metafield;
const Address = require("./address").AddressObject;

const BrandAsset = {
  mediaId: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  }
};

const Locale = {
  continents: Object,
  countries: Object
};

const Languages = {
  label: String,
  i18n: String,
  enabled: {
    type: Boolean,
    default: true
  }
};

const ShopTheme = {
  themeId: String,
  styles: {
    type: String,
    required: false
  }
};

const Currency = {
  symbol: {
    type: String,
    defaultValue: "$"
  },
  format: {
    type: String,
    defaultValue: "%s%v"
  },
  scale: {
    type: Number,
    defaultValue: 2
  },
  decimal: {
    type: String,
    defaultValue: "."
  },
  thousand: {
    type: String,
    defaultValue: ","
  },
  rate: {
    type: Number
  }
};

const ShopSchema = new Schema({
  "status": {
    type: String,
    default: "active"
  },
  "name": {
    type: String
  },
  "description": {
    type: String
  },
  "keywords": {
    type: String
  },
  "addressBook": [Address],
  "domains": [{
    type: String,
    default: ["localhost"]
  }],
  "emails": [Email],
  "defaultPaymentMethod": {
    type: String,
    default: "none"
  },
  "currency": {
    type: String,
    default: "USD"
  },
  "currencies": {
    type: Object // Schemas.Currency
  },
  "locales": Locale,
  "language": {
    type: String,
    default: "en"
  },
  "languages": {
    type: [Languages],
    required: false
  },
  "public": {
    type: String,
    required: false
  },
  "timezone": {
    type: String,
    default: "US/Pacific"
  },
  "baseUOM": {
    type: String,
    required: false,
    default: "OZ"
  },
  "unitsOfMeasure": [{
    type: Object,
    required: false
  }],
  "unitsOfMeasure.$.uom": {
    type: String,
    default: "OZ"
  },
  "unitsOfMeasure.$.label": {
    type: String,
    default: "Ounces"
  },
  "unitsOfMeasure.$.default": {
    type: Boolean,
    default: false
  },
  "metafields": [Metafield],
  "defaultVisitorRole": [{
    type: String,
    default: ["anonymous", "guest", "product", "tag", "index", "cart/checkout", "cart/completed"]
  }],
  "defaultRoles": [{
    type: [String],
    default: ["guest", "account/profile", "product", "tag", "index", "cart/checkout", "cart/completed"]
  }],
  "layout": {
    type: [Layout],
    required: false
  },

  "theme": ShopTheme,

  "brandAssets": [BrandAsset],
  "createdAt": {
    type: Date
  },
  "updatedAt": {
    type: Date
  }
});

ShopSchema.pre("save", (next) => {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

exports.Shops = mongoose.model("Shops", ShopSchema, "Shops");
