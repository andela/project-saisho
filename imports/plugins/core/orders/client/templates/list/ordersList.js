import moment from "moment";
import { Template } from "meteor/templating";
import { Orders, Shops } from "/lib/collections";

import FlatButton from "/imports/plugins/core/ui/client/components/button/flatButton"; // Import flatbutton react component


/**
 * dashboardOrdersList helpers
 *
 */
Template.dashboardOrdersList.helpers({
  orderStatus() {
    if (this.workflow.status === "new") {
      return "submitted";
    }
    return this.workflow.status.split("/")[1];
  },
  showCanceled() {
    if (this.workflow.status === "coreOrderWorkflow/canceled" || this.workflow.status === "coreOrderWorkflow/completed") {
      return false;
    }
    return true;
  },
  orders(data) {
    if (data.hash.data) {
      return data.hash.data;
    }
    return Orders.find({}, {
      sort: {
        createdAt: -1
      },
      limit: 25
    });
  },
  orderAge() {
    return moment(this.createdAt).fromNow();
  },
  shipmentTracking() {
    return this.shipping[0].shipmentMethod.tracking;
  },
  shopName() {
    const shop = Shops.findOne(this.shopId);
    return shop !== null ? shop.name : void 0;
  },
  getClassName(orders) {
    order = orders || Template.instance().data;
    if (order.workflow.status === "coreOrderWorkflow/cancel-request") {
      return true;
    }
    return false;
  },
  // Create a helper to import in the FlatButton react component for
  // cancelOrder button
  CancelOrderButton() {
    const order = this || Template.instance().data;
    return  {
      component: FlatButton,
      kind: "flat",
      className: "btn-danger btn-sm",
      label: "Cancel order",
      disabled: Template.dashboardOrdersList.__helpers.get("getClassName").call(this, order),
      onClick() {
        const status = order.workflow.status.split("/")[1];
        let alertText = "Are you sure you want to cancel this order";

        if (status === "shipped") {
          alertText = `${alertText}, your order has been shipped and
          your shipping charge will not be refunded!`;
        }
        Alerts.alert({
          title: "Cancel order",
          text: alertText,
          showCancelButton: true,
          confirmButtonText: "Cancel Order"
        }, (isConfirm) => {
          if (isConfirm) {
            Meteor.call("orders/customerCancelOrder", order._id, function (error) {
              if (error) {
                console.log("error", error);
              }
            });
          }
        });
      }
    };
  }
});
