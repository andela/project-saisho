const Users  = require("./../models/account").Users;
const helper = require("./../services/helpers");

const validateUser = (email, password) => {
  if (!helper.isValidEmail(email)) {
    return false;
  }
  if (!helper.validateInput(password)) {
    return false;
  }
  return true;
};


const create = (email, password, callback) => {
  if (validateUser(email, password)) {
    const hashedPassword = helper.hashPassword(password);

    Users.create({
      emails: [{address: email}],
      services: {
        password: {
          bcrypt: hashedPassword
        }
      }
    }, (err, user) => {
      callback(err, user);
    });
  }
};

module.exports = create;
