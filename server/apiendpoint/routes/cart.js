module.exports = (router) => {
  const cartCtrl =  require("./../controllers/cart")();
  router.route("/carts")
   .get(cartCtrl.all)
   .post(cartCtrl.add)
   .put(cartCtrl.edit);
  router.route("/carts/:id")
   .delete(cartCtrl.delete)
   .get(cartCtrl.getCart);
};
