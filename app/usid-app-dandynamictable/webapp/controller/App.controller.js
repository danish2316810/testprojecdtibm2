sap.ui.define([
  "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (BaseController,JSONModel) => {
  "use strict";

  return BaseController.extend("usib.app.dan.usidappdandynamictable.controller.App", {
      onInit() {
         var oKeyModel = new JSONModel("model/keyData.json");
                this.getView().setModel(oKeyModel, "keyConfig");
      }
      
  });
});