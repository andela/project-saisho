module.exports = (router) => {
  const accountCtrl =  require("./../controllers/accounts")();
  router.route("/accounts")
   .get(accountCtrl.all)
   .post(accountCtrl.add);
  router.route("/accounts/:id")
   .put(accountCtrl.edit)
   .delete(accountCtrl.delete)
   .get(accountCtrl.getAccount);
};
