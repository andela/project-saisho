import { Audio } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * CollectionFS - Image/Video Publication
 * @params {Array} shops - array of current shop object
 */
Meteor.publish("Audio", function () {
//   check(shops, Match.Optional(Array));
//   let selector;
//   const shopId = Reaction.getShopId();
//   if (!shopId) {
//     return this.ready();
//   }
//   if (shopId) {
//     selector = {
//       "metadata.shopId": shopId
//     };
//   }
//   if (shops) {
//     selector = {
//       "metadata.shopId": {
//         $in: shops
//       }
//     };
//   }
  return Audio.find();
});
