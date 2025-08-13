sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPressAction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
