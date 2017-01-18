const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Metafield = require("./metafield").Metafield;
const Workflow = require("./workflow").Workflow;
const ShippingParcel = require("./shipping").ShippingParcel;

const ProductVariant = {
  ancestors: {
    type: [String],
    default: []
  },
  // since implementing of flattened model this property is used for keeping
  // array index. This is needed for moving variants through list (drag'n'drop)
  index: Number,
  isVisible: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  barcode: String,
  compareAtPrice: Number,
  fulfillmentService: String,
  weight: Number,
  inventoryManagement: {
    type: Boolean,
    default: true
  },
  // this represents an ability to sell item without keeping it on stock. In
  // other words if it is disabled, then you can sell item even if it is not in
  // stock.
  inventoryPolicy: {
    type: Boolean,
    default: true
  },
  lowInventoryWarningThreshold: Number,
  inventoryQuantity: Number,
  minOrderQuantity: Number,
  price: Number,
  shopId: String,
  sku: String,
  type: {
    type: String,
    default: "variant"
  },
  taxable: {
    type: Boolean,
    default: true
  },
  taxCode: {
    type: String,
    default: "00000"
  },
  // Label for customers
  title: String,
  // Option internal name
  optionTitle: {
    type: String,
    default: "Untitled Option"
  },
  metafields: [Metafield],
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  workflow: Workflow
};

exports.ProductVariant = ProductVariant;

const PriceRange = {
  range: String,
  min: Number,
  max: Number
};

/**
 * ProductPosition Schema
 */
const ProductPosition = {
  tag: {
    type: String,
    required: false
  },
  position: {
    type: Number,
    required: false
  },
  pinned: {
    type: Boolean,
    required: false
  },
  weight: {
    type: Number,
    required: false,
    default: 0
  },
  updatedAt: {
    type: Date
  }
};

/**
 * Product Schema
 */
const ProductSchema = new Schema({
  ancestors: {
    type: [String],
    default: []
  },
  shopId: {
    type: String
  },
  title: {
    type: String,
    default: ""

  },
  pageTitle: {
    type: String,
    required: false

  },
  description: String,
  type: {
    type: String,
    default: "simple"
  },
  vendor: String,
  metafields: [Metafield],
  positions: Object, // ProductPosition
  price: PriceRange,
  // Denormalized field: Indicates when at least one of variants
  // `inventoryQuantity` are lower then their `lowInventoryWarningThreshold`.
  // This is some kind of marketing course.
  isLowQuantity: {
    type: Boolean
  },
  // Denormalized field: Indicates when all variants `inventoryQuantity` is zero
  isSoldOut: {
    type: Boolean
  },
  // Denormalized field. It is `true` if product not in stock, but customers
  // anyway could order it.
  isBackorder: {
    type: Boolean
  },
  requiresShipping: {
    type: Boolean,
    default: true
  },
  parcel: ShippingParcel,
  hashtags: [String],
  twitterMsg: {
    type: String,
    required: false
  },
  facebookMsg: {
    type: String,
    required: false
  },
  googleplusMsg: {
    type: String,
    required: false
  },
  pinterestMsg: {
    type: String,
    required: false
  },
  metaDescription: {
    type: String,
    required: false
  },
  handle: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  templateSuffix: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    required: false
  },
  publishedAt: {
    type: Date,
    required: false
  },
  publishedScope: {
    type: String,
    required: false
  },
  workflow: Workflow
});

ProductSchema.pre("save", (next) => {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  if (!this.publishedAt) {
    this.publishedAt = now;
  }
  next();
});

exports.Products = mongoose.model("Products", ProductSchema, "Products");
