module.exports = (router) => {
  const shopCtrl =  require("./../controllers/shop")();
  router.route("/shops")
   .get(shopCtrl.all)
   .post(shopCtrl.add);
  router.route("/shops/:id")
    .put(shopCtrl.edit)
    .delete(shopCtrl.delete)
    .get(shopCtrl.getShop);
};
