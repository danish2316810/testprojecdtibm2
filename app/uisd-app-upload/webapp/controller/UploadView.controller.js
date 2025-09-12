

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("usib.app.dan.uisdappupload.controller.UploadView", {
        onInit() {
            const oModel=new sap.ui.model.json.JSONModel()
                  oModel.setData({
                    fileName:"",
                    base64:""
                  })
            this.getView().setModel(oModel,"UploadModel")
        },
        onFileChange:function(oEvent){
            var oModel=this.getView().getModel("UploadModel");
            var ofile=oEvent.getParameter("newValue")
                oModel.setProperty("/fileName",ofile)
                this.getBase64Data(oEvent.getParameter("files")[0])
                
           
        },
        getBase64Data: function (ofile) {
            if (!ofile) {
                MessageBox.show("no files attached");
            } else {
                const reader = new FileReader();
                let oModel = this.getView().getModel("UploadModel");

                reader.onload = (e)=>  {
                    let sBase64 = e.target.result; // base64 string with "data:...;base64,"
                    sBase64 = sBase64.split(",")[1]; 
                    oModel.setProperty("/base64", sBase64);
                    oModel = this.getView().getModel("UploadModel");
                };

                reader.readAsDataURL(ofile);
                
            }
        },
        
        onFileUpload:function(){
            const oModel=this.getView().getModel("UploadModel");
            const upload={
                fileName:oModel.getProperty("/fileName"),
                payload:oModel.getProperty("/base64")
            }
            let url="/odata/v4/MyServiceMain/uploadCustomer"
            this.getView().setBusy(true)            
            $.ajax({
                url:url,
                type:"POST",
                contentType:"application/json",
                data:JSON.stringify(upload),
                success:(oRes)=>{
                    this.getView().setBusy(false)
                    MessageBox.show("Data posted")
                },
                error:(oRes)=>{
                    this.getView().setBusy(false)
                    MessageBox.show("Data failed")
                }
            })
          
        },
        onClear:function(){
            MessageBox.show("hi")
        }
    });
});