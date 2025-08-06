sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onReprocessBtn: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});



