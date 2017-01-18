/**
 * @summary Layout Schema
 * Layout are used by the Shops and Packages schemas.
 * They are used to defin both the template layout on the site,
 * as well as the workflow components that will be used in each
 * layout block.
 *
 *  "layout": "coreLayout",
 *  "workflow": "coreWorkflow",
 *  "theme": "default",
 *  "enabled": true,
 *  "structure": {
 *   "template": "products",
 *   "layoutHeader": "layoutHeader",
 *   "layoutFooter": "layoutFooter",
 *   "notFound": "notFound",
 *   "dashboardControls": "dashboardControls",
 *   "adminControlsFooter": "adminControlsFooter"
 */

/**
 * Permissions Schema
 */

 const Audience = {
   permission: String,
   label: String
 };

 const LayoutStructure = {
   template: String,
   layoutHeader: String,
   layoutFooter: String,
   notFound: String,
   dashboardHeader: String,
   dashboardControls: String,
   dashboardHeaderControls: String,
   adminControlsFooter: String
 };

 exports.Layout = {
   layout: String,
   workflow: String,
   template: String,
   collections: String,
   theme: String,
   enabled: Boolean,
   status: String,
   label: String,
   container: String,
   audience: Audience,
   structure: LayoutStructure,
   priority: {
     type: Number,
     default: 1
   },
   position: {
     type: Number,
     default: 1
   }
 };
