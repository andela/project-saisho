const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Address = require("./address").AddressObject;
const Metafield = require("./metafield").Metafield;

const Profile = {
  addressBook: [Address],
  name: String,
  picture: String
};

const Email = {
  provides: {
    type: String,
    default: "default"
  },
  address: String,
  verified: {
    type: Boolean,
    default: false
  }
};

exports.Email = Email;

const UserSchema = new Schema({
  createdAt: {
    type: Date
  },
  services: {
    password: {
      bcrypt: String
    }
  },
  username: String,
  emails: [Email],
  profile: Profile,
  roles: String
});

UserSchema.pre("save", function (next) {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Users = mongoose.model("Users", UserSchema, "users");
exports.Users = Users;

const AccountSchema = new Schema({
  userId: {
    type: String,
    ref: Users
  },
  sessions: [String],
  shopId: String,
  emails: [Email],
  acceptsMarketing: {
    type: Boolean,
    default: false
  },
  state: {
    type: String,
    default: "new"
  },
  note: String,
  profile: Profile,
  metafields: [Metafield],
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

AccountSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Accounts = mongoose.model("Accounts", AccountSchema, "Accounts");
exports.Accounts = Accounts;
