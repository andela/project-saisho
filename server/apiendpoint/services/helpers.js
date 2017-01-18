const bcrypt = require("bcrypt-nodejs");

const Helpers = {
  validateInput: (input) => {
    if (input) {
      return true;
    }
    return false;
  },

  isValidEmail: (email) => {
    return /^.*@.*\..{2,3}$/.test(email);
  },

  validateRequestBody: (body) => {
    for (let key in body) {
      if (body.hasOwnProperty(key)) {
        if (!Helpers.validateInput(body[key])) {
          return false;
        }
      }
    }
    return true;
  },

  handleError: (res, error) => {
    res.status(500).json(error);
  },

  sendMessage: (res, success, status, message) => {
    res.status(status).json({
      success: success,
      message: message
    });
  },

  comparePasswords: (string, hashed) => {
    const result = bcrypt.compareSync(string, hashed);
    return result;
  },

  hashPassword: (password) => {
    return bcrypt.hashSync(password);
  }
};

module.exports = Helpers;
