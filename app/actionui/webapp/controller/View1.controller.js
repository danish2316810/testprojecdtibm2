sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller,MessageBox,MessageToast) => {
    "use strict";

    return Controller.extend("ap.actionui.controller.View1", {
        onInit() {
        },
        onPress: function () {
            // Step 1: Get values from input fields
            var customerName = this.byId("idName").getValue();
            var currency = this.byId("idCurrency").getValue();
            var country = this.byId("idCountry").getValue();
            let oModel = this.getOwnerComponent().getModel();
            let url = oModel.sServiceUrl + "CUST";
            // Step 2: Create the payload
            var payload = {
                CUSTOMER_NAME: customerName,
                CURRENCY: currency,
                COUNTRY: country
            };
        
            // Step 3: Make AJAX POST call
            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(payload),
                success: function (response) {
                    MessageToast.show("Customer created successfully!");
                },
                error: function (xhr, status, error) {
                    MessageBox.error("Error creating customer: " + xhr.responseText);
                }
            });
        }



    });
});