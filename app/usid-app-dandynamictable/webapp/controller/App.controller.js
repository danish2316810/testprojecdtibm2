sap.ui.define([
  "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (BaseController,JSONModel) => {
  "use strict";

  return BaseController.extend("usib.app.dan.usidappdandynamictable.controller.App", {
      onInit() {
         var oKeyModel = new JSONModel({
  "nominations": {
    "entitySet": "NominationErrorsView",
    "keys": ["ID", "nominationKey", "nominationItem"],
    "labels": {
          "ID": "ID",
          "nominationKey": "Nomination Key",
          "nominationItem": "Nomination Item",
          "diliveryReciept": "Delivery Receipt",
          "scheduleDate": "Schedule Date",
          "transportSystem": "Transport System",
          "lastRetry": "Last Retry",
          "shippingType": "Shipping Type",
          "reprocessCount": "Reprocess Count",
          "createdBy": "Created By",
          "createdAt": "Created At",
          "modifiedAt": "Modified At",
          "modifiedBy": "Modified By",
          "errorCode": "Error Code",
          "errorDesc": "Error Description",
          "errorEnabledForReprocessing": "Error Enabled for Reprocessing",
          "sourceSystem": "Source System",
          "enabledForReprocessing": "Enabled for Reprocessing",
          "httpErroMessage": "HTTP Error Message",
          "httpErrorCode": "HTTP Error Code",
          "interfaceEnabledForReprocessing": "Interface Enabled for Reprocessing"
        }

  },
  "contracts": {
    "entitySet": "ContractErrorsView",
    "keys": ["ID","terminalNo", "folioMo"],
    "labels": {
        "ID": "ID",
        "createdAt": "Created At",
        "createdBy": "Created By",
        "enabledForReprocessing": "Enabled for Reprocessing",
        "errorCode": "Error Code",
        "errorDesc": "Error Description",
        "errorEnabledForReprocessing": "Error Enabled for Reprocessing",
        "folioMo": "Folio Month",
        "httpErroMessage": "HTTP Error Message",
        "httpErrorCode": "HTTP Error Code",
        "interfaceEnabledForReprocessing": "Interface Enabled for Reprocessing",
        "invNo": "Invoice Number",
        "lastRetry": "Last Retry",
        "modifiedAt": "Modified At",
        "modifiedBy": "Modified By",
        "reprocessCount": "Reprocess Count",
        "sourceSystem": "Source System",
        "terminalNo": "Terminal Number"
      }

  }
});
                this.getView().setModel(oKeyModel, "keyConfig");
      }
      
  });
});