module.exports = () => {
  const Shops  = require("./../models/shop").Shops;
  const helper = require("./../services/helpers.js");

  const methods = {
    all: (req, res) => {
      Shops.find({}, (err, shops) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return res.json(shops);
      });
    },
    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Shops.create({
          "status": req.body.status,
          "name": req.body.name,
          "description": req.body.description,
          "key": req.body.words,
          "addressBook": req.body.addressBook,
          "domains": req.body.domains,
          "emails": req.body.emails,
          "defaultPaymentMethod": req.body.defaultPaymentMethod,
          "currency": req.body.currency,
          "locales": req.body.locales,
          "language": req.body.language,
          "public": req.body.public,
          "timezone": req.body.timezone,
          "baseUOM": req.body.baseUOM,
          "unitsOfMeasure": req.body.unitsOfMeasure,
          "unitsOfMeasure.$.label": req.body["unitsOfMeasure.$.label"],
          "unitsOfMeasure.$.default": req.body["unitsOfMeasure.$.defaul"],
          "metafields": req.body.metafields,
          "defaultVisitorRole": req.body.defaultVisitorRole,
          "defaultRoles": req.body.defaultRoles,
          "layout": req.body.layout,
          "theme": req.body.theme,
          "brandAssets": req.body.brandAssets
        }, (err, shop) => {
          if (err) {
            return helper.handleError(res, err);
          }
          return res.json(shop);
        });
      } else {
        return helper.sendMessage(res, false, 400, "Feilds cannot be empty");
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Shops.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true },
        (err) => {
          if (err) {
            return helper.handleError(res, err);
          }

          return helper.sendMessage(res, true, 200, "updated successfully");
        });
      } else {
        helper.sendMessage(res, false, 400, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      Shops.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return helper.sendMessage(res, true, 200, "Shop deleted successfully");
      });
    },

    getShop: (req, res) => {
      Shops.findOne({_id: req.params.id}, (err, shop) => {
        if (err) {
          helper.handleError(res, err);
        }
        if (!shop) {
          return helper.sendMessage(res, false, 404, "shop does not exist");
        }
        return res.json(shop);
      });
    }
  };

  return methods;
};
