sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(MessageToast,MessageBox) {
    'use strict';

    return {
        onReprocessBtn: function(oEvent) {
              const oObject=oEvent.getSource().getBindingContext().getObject();
          const data={
            "entityName":"ContractErrors",
            "sourceSystem":oObject.sourceSystem,
            "keys":[{
                "keyName":"ID",
                "value":oObject.ID
            },{
                "keyName":"terminalNo",
                "value":oObject.terminalNo
            },{
                "keyName":"folioMo",
                "value":oObject.folioMo
            }]
          } 
          const modulePath="";//sap.ui.require.toUrl("app/dan/testfiori")
          const dataFinal={data};
          this._view.setBusy(true)
          $.ajax({
            url:"/odata/v4/error-mangement/reprocessFromUi",
            type:"POST",
            data:JSON.stringify(dataFinal),
            contentType:'application/json',
            success:(odata)=>{
                if(odata){
                    this._view.setBusy(false);
                    MessageBox.show(odata.value)
                    
                    
                }
            },
            error:(oError)=>{
                this._view.setBusy(false);
                MessageBox.error(odata.value)
            }
          })

        }
    };
});



