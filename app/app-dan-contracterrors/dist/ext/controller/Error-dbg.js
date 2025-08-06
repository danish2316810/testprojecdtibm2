sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onErrorCodePress: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
