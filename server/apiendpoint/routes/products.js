module.exports = (router) => {
  const productCtrl =  require("./../controllers/products")();
  router.route("/products")
   .get(productCtrl.all)
   .post(productCtrl.add);
  router.route("/products/:id")
    .put(productCtrl.edit)
    .delete(productCtrl.delete)
    .get(productCtrl.getProduct);
};
