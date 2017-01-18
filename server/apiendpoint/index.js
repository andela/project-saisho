export default function () {
  const mongoose = require("mongoose");
  const express = require("express");
  const app = express();
  const port = process.env.METEOR_SETTINGS.port || 3030;
  const bodyParser = require("body-parser");
  const logger = require("winston");

  mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) {
      logger.info(err);
    }
  });

  app.get("/", (req, res) => {
    res.json({
      message: " root reoute"
    });
  });

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  const router = express.Router();
  require("./routes/email")(router);
  require("./routes/cart")(router);
  require("./routes/products")(router);
  require("./routes/order")(router);
  require("./routes/shop")(router);
  require("./routes/account")(router);
  app.use("/api/", router);


  app.listen(port, () => {
    logger.info("API running at: http://localhost " + port);
  });
}
