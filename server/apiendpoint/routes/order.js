module.exports = (router) => {
  const orderCtrl =  require("./../controllers/order")();
  router.route("/orders")
   .get(orderCtrl.all)
   .post(orderCtrl.add);
  router.route("/orders/:id")
   .put(orderCtrl.edit)
   .delete(orderCtrl.delete)
   .get(orderCtrl.getOrder);
};
