const Workflow = require("./workflow").Workflow;
const Address = require("./address").AddressObject;

const PaymentMethod = {
  processor: {
    type: String
  },
  storedCard: {
    type: String
  },
  method: {
    type: String
  },
  transactionId: {
    type: String
  },
  metadata: {
    type: Object
  },
  workflow: {
    type: Workflow
  },
  status: {
    type: String
  },
  mode: {
    type: String,
    allowedValues: ["authorize", "capture", "refund", "void"]
  },
  authorization: {
    type: String
  },
  amount: {
    type: Number
  },
  currency: {
    type: String
  },
  transactions: {
    type: [Object]
  }
};

const Invoice = {
  transaction: {
    type: String
  },
  shipping: {
    type: Number
  },
  taxes: {
    type: Number
  },
  subtotal: {
    type: Number
  },
  discounts: {
    type: Number
  },
  total: {
    type: Number
  }
};
exports.Invoice = Invoice;

const Payment = {
  address: {
    type: Address
  },
  paymentMethod: {
    type: PaymentMethod
  },
  invoice: {
    type: Invoice
  }
};
exports.Payment = Payment;

const Refund = {
  type: {
    type: String
  },
  amount: {
    type: Number
  },
  created: {
    type: Number
  },
  currency: {
    type: String
  },
  raw: {
    type: Object
  }
};
