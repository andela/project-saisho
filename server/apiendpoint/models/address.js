const Metafield = require("./metafield").Metafield;


const AddressObject = {
  fullName: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  city: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: String
  },
  region: {
    type: String
  },
  postal: {
    type: String
  },
  country: {
    type: String
  },
  isCommercial: {
    type: Boolean
  },
  isBillingDefault: {
    type: Boolean
  },
  isShippingDefault: {
    type: Boolean
  },
  metafields: [Metafield]
};

exports.AddressObject = AddressObject;
