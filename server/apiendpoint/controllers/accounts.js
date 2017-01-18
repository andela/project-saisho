module.exports = () => {
  const createUser  = require("./user");
  const Accounts  = require("./../models/account").Accounts;
  const Users  = require("./../models/account").Users;
  const helper = require("./../services/helpers");
  const auth = require("./../services/auth");

  const methods = {
    all: (req, res) => {
      Accounts.find({}, (err, accounts) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return res.json(accounts);
      });
    },

    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        createUser(req.body.email, req.body.password, (err, user) => {
          if (err) {
            return helper.handleError(res, err);
          }

          const token = auth.generateToken({
            userId: user._id,
            shopId: req.headers["x-shop-id"]
          });

          Accounts.create({
            userId: user._id,
            shopId: req.headers["x-shop-id"]
          }, (error, account) => {
            if (error) {
              return helper.handleError(error);
            }
            return res.json({
              account: account,
              token: token
            });
          });
        });
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Accounts.update({_id: req.params.id}, {$set: req.body},
        (err) => {
          if (err) {
            return helper.handleError(res, err);
          }

          return helper.sendMessage(res, true, 200, "updated successfully");
        });
      } else {
        return helper.sendMessage(res, false, 404, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      methods.deleteAccount(req, res, (err, account) => {
        Users.findByIdAndRemove(account.userId, (errors) => {
          if (!errors) {
            Accounts.findByIdAndRemove(req.params.id)
            .exec((error) => {
              if (error) {
                return helper.handleError(res, err);
              }
              return helper.sendMessage(res, true, 200,
                "Account deleted successfully");
            });
          }
        });
      });
    },

    deleteAccount: (req, res, callback) => {
      Accounts.findOne({_id: req.params.id}, (err, account) => {
        callback(err, account);
      });
    },

    getAccount: (req, res) => {
      Accounts.findOne({_id: req.params.id}, function (err, account) {
        if (err) {
          return helper.handleError(res, err);
        }
        if (!account) {
          return helper.sendMessage(res, false, 400, "Account does not exist");
        }
        return res.json(account);
      });
    }
  };

  return methods;
};
