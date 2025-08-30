sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Column",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Label",
  "sap/m/ToolbarSpacer",
  "sap/m/Button",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "../utils/reuse"
], function(Controller, Column, Text, Input, Label, ToolbarSpacer, Button, JSONModel, MessageBox, reuse) {
  "use strict";

  return Controller.extend("usib.app.dan.usidappdandynamictable.controller.DetailView", {
    onInit: function() {
      this._config = reuse.getConfig();
      let oRouter = this.getOwnerComponent().getRouter();
      oRouter.getRoute("RouteDetailView").attachPatternMatched(this._onObjectMatched, this);
      
      // Log models
      console.log("Default Model:", this.getView().getModel());
      console.log("keyConfig Model:", this.getView().getModel("keyConfig"));
    },

    _onObjectMatched: function(oEvent) {
      var oArgs = oEvent.getParameter("arguments");
      var sTableType = oArgs.tableType; // 'nominations' or 'contracts'
      var sDynamicKeys = oArgs.dynamicKeys;

      // Decode dynamic keys
      var oDynamicKeys;
      try {
        oDynamicKeys = JSON.parse(atob(sDynamicKeys));
      } catch (e) {
        MessageBox.error("Error decoding dynamic keys: " + e.message);
        return;
      }

      // Get key configuration
      var oKeyModel = this.getView().getModel("keyConfig");
      if (!oKeyModel) {
        MessageBox.error("keyConfig model not found");
        return;
      }
      var oKeyConfig = oKeyModel.getData()[sTableType];
      if (!oKeyConfig) {
        MessageBox.error("Configuration not found for table type: " + sTableType);
        return;
      }

      // Create detail model
      var oDetailModel = new JSONModel({
        tableType: sTableType,
        details: oDynamicKeys,
        labels: oKeyConfig.labels || {}
      });
      this.getView().setModel(oDetailModel, "detail");

      // Log model data
      console.log("Detail Model Data:", oDetailModel.getData());
      console.log("Labels:", oKeyConfig.labels);

      // Build OData path
      var sEntitySet = oKeyConfig.entitySet;
      var sPath = this._buildODataPath(sTableType, oDynamicKeys, sEntitySet);

      // Log OData path
      console.log("OData Path:", sPath);

      // Clear old bindings and content
      var oView = this.getView();
      oView.unbindElement();
      oView.byId("detailBox").destroyItems();

      // Select fields for OData query
      var aFields = Object.keys(oKeyConfig.labels);
      var sSelect = aFields.join(",");
      var sFullPath = `${sPath}?$select=${sSelect}`;

      // Log full path
      console.log("OData Full Path:", sFullPath);

      // Bind element
      oView.bindElement({
        path: sPath,
        parameters: {
          $$groupId: "detailGroup",
          $select: sSelect
        },
        events: {
          dataReceived: function(oEvent) {
            var oData = oEvent.getParameter("data");
            console.log("OData Data Received:", oData);
            if (oData) {
              console.log("Binding Context:", oView.getBindingContext());
              this._buildDetailPage(sTableType);
            } else {
              console.log("No OData data received, building UI with keys only");
              this._buildDetailPage(sTableType); // Build with keys only
              MessageBox.warning("No data received for path: " + sPath);
            }
          }.bind(this),
          dataRequested: function() {
            console.log("OData Request Sent for:", sFullPath);
          },
          error: function(oEvent) {
            console.error("OData Binding Error:", oEvent.getParameter("message"));
            MessageBox.error("Failed to fetch data: " + oEvent.getParameter("message"));
            console.log("Building UI with keys only due to error");
            this._buildDetailPage(sTableType); // Build with keys only
          }.bind(this)
        }
      });

      // Store dynamic keys
      this._routeArgs = oDynamicKeys;

      // Fallback: Build UI immediately with keys if binding is delayed
      console.log("Triggering fallback UI build");
      this._buildDetailPage(sTableType);
    },

    _buildODataPath: function(sTableType, oDynamicKeys, sEntitySet) {
      var oKeyConfig = this.getView().getModel("keyConfig").getData()[sTableType];
      var aKeys = oKeyConfig.keys || [];
      var sKeyString = aKeys.map(function(sKey) {
        var sValue = oDynamicKeys[sKey] || "";
        return `${sKey}='${encodeURIComponent(sValue)}'`;
      }).join(",");
      return `/${sEntitySet}(${sKeyString})`;
    },

    _buildDetailPage: function(sTableType) {
      var oVBox = this.getView().byId("detailBox");
      oVBox.removeAllItems();

      var oKeyConfig = this.getView().getModel("keyConfig").getData()[sTableType];
      var oLabels = oKeyConfig.labels || {};
      var aFields = Object.keys(oLabels);

      if (aFields.length === 0) {
        MessageBox.error("No labels defined for table type: " + sTableType);
        oVBox.addItem(new sap.m.Text({ text: "No labels available" }));
        return;
      }

      console.log("Building Detail Page with Fields:", aFields);

      aFields.forEach(function(sField) {
        var sLabel = oLabels[sField] || sField;
        var sBindingField = sField;
        // Map field name mismatches
        if (sField === "diliveryReciept") {
          sBindingField = "deliveryReceipt"; // Adjust based on metadata
        }

        var oHBox = new sap.m.HBox({
          items: [
            new sap.m.Label({ text: sLabel + ": ", width: "150px" })
          ]
        });

        if (oKeyConfig.keys.includes(sField)) {
          oHBox.addItem(new sap.m.Text({ 
            text: this._routeArgs[sField] || "N/A",
            textAlign: "Left"
          }));
        } else {
          oHBox.addItem(new sap.m.Text({ 
            text: "{" + sBindingField + "}",
            textAlign: "Left"
          }));
        }
        oVBox.addItem(oHBox);
      }, this);
    }
  });
});