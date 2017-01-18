const jwt = require("jsonwebtoken");
const helper = require("./helpers");
const secret = process.env.METEOR_SETTINGS.secret || "secret";

const Auth = {

  generateToken: (payload) => {
    return jwt.sign(payload, secret, {
      expiresIn: 60 * 60 * 24
    });
  },

  verifyToken: (req, res, next, token) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
          // Send this response if token is not found or invalid
        return helper.sendMessage(res, false, 401, "Failed to authenticate");
      }
        // Attach decoded payload to request
      req.decoded = decoded;
      next();
    });
  },


  validateToken: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return helper.sendMessage(res, false, 401, "No token found. Token needed for authentication");
    }
    Auth.verifyToken(req, res, next, token);
  }
};

module.exports = Auth;
