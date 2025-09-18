sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat"
], function(MessageToast,MessageBox,DateFormat) {
    'use strict';
   const oDateTimeOffsetFormatter= DateFormat.getDateTimeInstance({
        //  calendarType: CalendarType.Gregorain,
         strictParsing:true
   })
    return {
        dateTimeFormat:function(sDate){
            let rDate="";
            if(sDate){
                const oDate= new Date(sDate);
                let utcDate=oDate.toUTCString();
                utcDate=utcDate.replace("GMT","");
                rDate=new Date(utcDate);
                rDate=oDateTimeOffsetFormatter.format(rDate)
            }
            return rDate;
        },
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
                    this._view.byId("app.dan.testfiori::ContractErrorsViewList--fe::table::ContractErrorsView::LineItem-innerTable").getBinding("items").refresh()
                                       
                }
            },
            error:(oError)=>{
                this._view.setBusy(false);
                MessageBox.error(oError.value)
            }
          })

        },
        onRejectIndPress:function(oEvent){
            const oObject=oEvent.getSource().getBindingContext().getObject();
            var mParameters = {
                ID: oObject["ID"],
                terminalNo: oObject["terminalNo"],
                folioMo: oObject["folioMo"]                
            };
            let newValue= oObject["rejectInd"] 
            this._view.setBusy(true);
            let url = `/odata/v4/error-mangement/ContractErrors(ID='${oObject.ID}',terminalNo='${oObject.terminalNo}',folioMo='${oObject.folioMo}')/ErrorMangement.changeRejInd`;
             $.ajax({
            url:url,
            type:"POST",
            data: JSON.stringify({ newValue: newValue }),
            contentType: "application/json",
            success:(odata)=>{
                if(odata){
                    this._view.setBusy(false);
                    MessageBox.show(`value changed to:"${odata.REJECTIND}"`)
                    this._view.byId("app.dan.testfiori::ContractErrorsViewList--fe::table::ContractErrorsView::LineItem-innerTable").getBinding("items").refresh()
                    
                    
                }
            },
            error:(oError)=>{
                this._view.setBusy(false);
                MessageBox.error(oError.value)
            }
          })
            
            
        }
    };
});



