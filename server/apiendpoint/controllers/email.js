module.exports = () => {
  const Emails  = require("./../models/email");
  const helper = require("./../services/helpers.js");

  const methods = {
    all: (req, res) => {
      Emails.find({}, (err, users) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return res.json(users);
      });
    },

    add: (req, res) => {
      if (!helper.validateRequestBody(req.body)) {
        return helper.sendMessage(res, false, 400, "Fields cannot be empty");
      }
      if (!(helper.isValidEmail(req.body.to))
       && (helper.isValidEmail(req.body.from))) {
        return helper.sendMessage(res, false, 400,
          "Enter valid emails for to and from");
      }
      Emails.create({
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html,
        jobId: req.body.jobId,
        status: req.body.status
      }, (err, email) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.json(email);
      });
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Emails.findOne({_id: req.params.id}, (err, email) => {
          if (email) {
            Emails.update({_id: req.params.id}, {$set: req.body}, (error) => {
              if (error) {
                return helper.handleError(res, error);
              }

              return helper.sendMessage(res, true, 200, "updated successfully");
            });
          } else {
            return helper.sendMessage(res, false, 404, "Email not found");
          }
        });
      } else {
        return helper.sendMessage(res, false, 400, "Feilds cannot be empty");
      }
    },

    delete: (req, res) => {
      Emails.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          return helper.handleError(res, err);
        }
        return helper.sendMessage(res, true, 200, "Email deleted successfully");
      });
    },

    getEmail: (req, res) => {
      Emails.findOne({_id: req.params.id}, (err, email) => {
        if (err) {
          return helper.handleError(res, err);
        }
        if (!email) {
          return helper.sendMessage(res, false, 404, "Email does not exist");
        }
        return res.json(email);
      });
    }

  };

  return methods;
};
