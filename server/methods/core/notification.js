import { Meteor } from "meteor/meteor";
import { Notifications } from "/lib/collections";

Meteor.methods({
  "createNotification": function (order) {
    check(order, Object);
    let notifyUser = false;
    this.unblock();
    const roleObj = Object.keys(Meteor.user().roles);

    if (Meteor.user().roles[roleObj[0]].includes("admin")) {
      notifyUser = true;
    }

    Notifications.insert({
      userId: order.userId,
      orderId: order._id,
      action: order.status,
      orderUrl: order.orderUrl,
      read: false,
      notifyUser
    });

    // console.log("Here are the Notifications", Notifications.find().fetch());
  }
});
