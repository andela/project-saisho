module.exports = (router) => {
  const emailCtrl =  require("./../controllers/email")();
  router.route("/emails")
   .get(emailCtrl.all)
   .post(emailCtrl.add);
  router.route("/emails/:id")
   .put(emailCtrl.edit)
   .delete(emailCtrl.delete)
   .get(emailCtrl.getEmail);
};
