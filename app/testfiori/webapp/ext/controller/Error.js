sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog"
], function(MessageToast,Dialog) {
    'use strict';

    return {
        onErrorCodePress: function(oEvent) {
            // MessageToast.show("Custom handler invoked.");
            let x=oEvent.getSource().getBindingContext().getObject()
            let oResourceBundle=this.getModel("i18n").getResourceBundle()
            let oVbox=new sap.m.VBox()
            oVbox.addStyleClass("sapUiTinyMargin")
            let labelErrorDes=new sap.m.Label({
                text:oResourceBundle.getText("errorDesc")
            })
            let textErrDes=new sap.m.Text({
                text:x.errorDesc
            })
            // textErrDes.addStyleClass("sapUiSmallMarginBottom")
            oVbox.addItem(labelErrorDes)
             oVbox.addItem(textErrDes)

             this.oDialog=new Dialog({
                title:oResourceBundle.getText("Error"),
                content:oVbox,
                beginButton:new sap.m.Button({
                    text:oResourceBundle.getText("OK"),
                    type:"Emphasized",
                    press:function(){
                        this.oDialog.close()
                    }.bind(this)

                })
             })
             this.oDialog.open()

        }
    };
});
