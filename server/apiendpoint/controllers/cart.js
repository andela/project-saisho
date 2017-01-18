module.exports = () => {
  const Carts  = require("./../models/cart").Cart;
  const helper = require("./../services/helpers.js");

  const methods = {
    all: (req, res) => {
      Carts.find({}, (err, carts) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return res.json(carts);
      });
    },
    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Carts.create({
          userId: req.headers["x-user-id"],
          shopId: req.headers["x-shop-id"],
          sessionId: req.body.sessionId,
          email: req.body.email,
          items: req.body.items,
          shipping: req.body.shipping,
          billing: req.body.billing,
          tax: req.body.tax,
          taxes: req.body.taxes,
          workflow: req.body.workflow
        }, (err, cart) => {
          if (err) {
            return helper.handleError(res, err);
          }
          return res.json(cart);
        });
      } else {
        return helper.sendMessage(res, false, 400, "Feilds cannot be empty");
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) { // chage to decoded
        Carts.update({userId: req.headers["x-user-id"]}, {$set: req.body}, (err) =>  {
          if (err) {
            return helper.handleError(res, err);
          }

          return helper.sendMessage(res, true, 200, "updated successfully");
        });
      } else {
        return helper.sendMessage(res, false, 400, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      Carts.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return helper.sendMessage(res, true, 200, "Cart deleted successfully");
      });
    },
    getCart: (req, res) => {
      Carts.findOne({_id: req.params.id}, (err, cart) => {
        if (err) {
          return helper.handleError(res, err);
        }
        if (!cart) {
          return helper.sendMessage(res, false, 404, "Cart does not exist");
        }
        return res.json(cart);
      });
    }

  };

  return methods;
};
