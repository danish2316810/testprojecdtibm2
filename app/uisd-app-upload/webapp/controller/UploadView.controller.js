

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
        onDownloadTemplate: function () {
    // 1. Define headers
    const headers = [["CUSTOMER_NAME", "CURRENCY", "COUNTRY"]];

    // 2. Create a worksheet with just headers
    const worksheet = XLSX.utils.aoa_to_sheet(headers);

    // 3. Create a new workbook & append sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // 4. Convert workbook to binary
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 5. Create blob
    const blob = new Blob([wbout], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    // 6. Create a temporary link element to download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "CustomerTemplate.xlsx";
    document.body.appendChild(link);
    link.click();

    // 7. Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
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