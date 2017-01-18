import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Template } from "meteor/templating";
import { Orders } from "/lib/collections";

import FlatButton from "/imports/plugins/core/ui/client/components/button/flatButton"; // Import flatbutton react component

Template.coreOrderShippingTracking.onCreated(() => {
  const template = Template.instance();
  const currentData = Template.currentData();

  template.orderDep = new Tracker.Dependency;
  template.showTrackingEditForm = ReactiveVar(false);

  function getOrder(orderId, shipmentId) {
    template.orderDep.depend();
    return Orders.findOne({
      "_id": orderId,
      "shipping._id": shipmentId
    });
  }

  Tracker.autorun(() => {
    template.order = getOrder(currentData.orderId, currentData.fulfillment._id);
  });
});

/**
 * coreShipmentShipped events
 *
 */
Template.coreOrderShippingTracking.events({
  "click [data-event-action=shipmentShipped]": function () {
    const template = Template.instance();
    Meteor.call("orders/shipmentShipped", template.order, template.order.shipping[0]);
    // Meteor.call("workflow/pushOrderShipmentWorkflow", "coreOrderShipmentWorkflow", "orderShipped", this._id);
  },

  "click [data-event-action=resendNotification]": function () {
    const template = Template.instance();
    Meteor.call("orders/sendNotification", template.order, (err) => {
      if (err) {
        Alerts.toast("Server Error: Can't send email notification.", "error");
      } else {
        Alerts.toast("Email notification sent.", "success");
      }
    });
  },

  "click [data-event-action=shipmentPacked]": () => { // TODO: look into this
    const template = Template.instance();

    Meteor.call("orders/shipmentPacked", template.order, template.order.shipping[0], true);
  },

  "submit form[name=addTrackingForm]": (event, template) => {
    event.preventDefault();
    event.stopPropagation();

    const currentData = Template.currentData();
    const order = template.order;
    const shipment = currentData.fulfillment;
    const tracking = event.target.trackingNumber.value;

    Meteor.call("orders/updateShipmentTracking", order, shipment, tracking,
      (error) => {
        if (!error) {
          template.orderDep.changed();
          template.showTrackingEditForm.set(false);
        }
      });
  },
  "click [data-event-action=editTracking]": (event, template) => {
    template.showTrackingEditForm.set(true);
  }
});

Template.coreOrderShippingTracking.helpers({
  isShipped() {
    const currentData = Template.currentData();
    const order = Template.instance().order;

    const shippedItems = _.every(currentData.fulfillment.items, (shipmentItem) => {
      const fullItem = _.find(order.items, (orderItem) => {
        if (orderItem._id === shipmentItem._id) {
          return true;
        }
      });
      return fullItem.workflow.status === "coreOrderItemWorkflow/shipped";
    });
    return shippedItems;
  },
  isCompleted() {
    const currentData = Template.currentData();
    const order = Template.instance().order;

    const completedItems = _.every(currentData.fulfillment.items, (shipmentItem) => {
      const fullItem = _.find(order.items, (orderItem) => {
        if (orderItem._id === shipmentItem._id) {
          return true;
        }
      });

      return fullItem.workflow.status === "coreOrderItemWorkflow/completed";
    });

    return completedItems;
  },
  editTracking() {
    const template = Template.instance();
    if (!template.order.shipping[0].tracking || template.showTrackingEditForm.get()) {
      return true;
    }
    return false;
  },
  order() {
    return Template.instance().order;
  },
  shipment() {
    return Template.instance().order.shipping[0];
  },
  shipmentReady() {
    const order = Template.instance().order;
    const shipment = order.shipping[0];

    return shipment.packed && shipment.tracking;
  },

  // check of the order has been cancelled
  orderCanceled() {
    const order = Template.instance().order;

    return (order.workflow.status === "coreOrderWorkflow/canceled");
  },

  // Create a helper to import in the FlatButton react component for
  // cancelOrder button
  CancelOrderButton() {
    const order = Template.instance().order;
    return  {
      component: FlatButton,
      kind: "flat",
      className: "btn-danger btn-block",
      label: "Cancel order",
      onClick() {
        let reason = document.querySelector("#cancelation-reason").value;

        if (reason === "others") {
          reason = document.querySelector(".other-reasons").value;
        }
        Meteor.call("orders/cancelOrder", order._id, reason, function (error) {
          if (error) {
            console.log("error", error);
          }
        });
      }
    };
  },

  // Create a helper to import in the FlatButton react component for
  // complete order button
  CompleteOrderButton() {
    const order = Template.instance().order;
    return  {
      component: FlatButton,
      kind: "flat",
      className: "btn-success btn-block",
      label: "Complete order",
      onClick() {
        Meteor.call("orders/orderCompleted", order, function (error) {
          if (error) {
            console.log("error", error);
          }
        });
      }
    };
  }
});
