module.exports = () => {
  const Orders  = require("./../models/order").Orders;
  const helper = require("./../services/helpers.js");

  const methods = {
    all: (req, res) => {
      Orders.find({}, (err, orders) => {
        if (err) {
          return helper.handleError(res, err);
        }
        res.json(orders);
      });
    },
    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Orders.create({
          cartId: req.body.cartId,
          history: req.body.history,
          notes: req.body.notes,
          items: req.body.items,
          transaction: req.body.transaction,
          documents: req.body.documents
        }, (err, order) => {
          if (err) {
            return helper.handleError(res, err);
          }
          res.json(order);
        });
      } else {
        helper.sendMessage(res, false, 400, "Feilds cannot be empty");
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Orders.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true },
        (err) => {
          if (err) {
            return helper.handleError(res, err);
          }

          helper.sendMessage(res, true, 200, "updated successfully");
        });
      } else {
        helper.sendMessage(res, false, 400, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      Orders.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          helper.handleError(res, err);
        } else {
          helper.sendMessage(res, true, 200, "Order deleted successfully");
        }
      });
    },
    getOrder: (req, res) => {
      Orders.findOne({_id: req.params.id}, (err, order) => {
        if (err) {
          helper.handleError(res, err);
        }
        if (!order) {
          helper.sendMessage(res, false, 404, "order does not exist");
        } else {
          res.json(order);
        }
      });
    }

  };

  return methods;
};
