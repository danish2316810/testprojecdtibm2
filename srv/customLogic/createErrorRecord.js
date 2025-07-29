const cds = require("@sap/cds")


module.exports=onCreateErrorRecord

async function onCreateErrorRecord(req) {
    try{
      const {data}=req.data
      const cdsEntityList=cds.entities("app.dan");
      const errorPayload=await formErrorData(data.interface,data.fields,cdsEntityList);
      const interfaceData=cdsEntityList.interfaceData;
      const isFieldMatch= validateErrorFields(errorPayload)
      console.log(errorPayload)
      // const entities=
      
    }catch(error){

    }
}
async function validateErrorFields(errorPayload) {
  
}
async function formErrorData(endPoint,httpPayloadFiledsdata,cdsEntityList) {
  const payload={}
  if(endPoint==="Contract"){
    payload.cdsEntityFullName=cdsEntityList.ContractErrors.name;
    payload.cdsEntityFieldsObject=cdsEntityList.ContractErrors.elements;
    payload.payloaddata=await formBtpTableErrorPayload(httpPayloadFiledsdata)
  }
  return payload;
}
async function formBtpTableErrorPayload(data) {
  const fieldsDataWithoutKeysAndValue={}
  data.forEach(item=>{
    fieldsDataWithoutKeysAndValue[item.keys]=item.value
  })
return fieldsDataWithoutKeysAndValue;
  
}