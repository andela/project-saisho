import "./methods";
import Startup from "./startup";
import Security from "./security";
import Api from "./apiendpoint";

Meteor.startup(() => {
  Api();
  Startup();
  Security();
});
