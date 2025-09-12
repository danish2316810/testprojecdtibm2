
const cds = require('@sap/cds');
const { parse } = require("csv-parse/sync"); 
const XLSX =require('xlsx')

module.exports = onUploadCustomer;

async function onUploadCustomer(req) {
  const { fileName, payload } = req.data;
  const cdsEntityList  =cds.entities;
  const { CUSTOMERS } = cds.entities("app.dan");
  
  const buffer = Buffer.from(payload, 'base64');
      if(fileName.toLowerCase().includes(".xlsx")){
        const workbook= XLSX.read(buffer,{type:'array'})
        const sheetName=workbook.SheetNames[0]
        const sheet=workbook.Sheets[sheetName]
        const uploadData=XLSX.utils.sheet_to_json(sheet)
        const formattedData=uploadData.map(items=>({
         ...items
        }))
   const newRecord=await INSERT.into(CUSTOMERS, formattedData)
   return newRecord;
    
      }else if(fileName.toLowerCase().includes(".csv")){}

//   // Parse CSV into rows
//   const records = parse(csvString, {
//     columns: true,   // use first row as header
//     skip_empty_lines: true
//   });

//   console.log("Parsed Records:", records);
//   // Example: [ { code: 'IN', name: 'India' }, { code: 'US', name: 'United States' } ]

//   // Map CSV columns into CDS entity structure
//   const customers = records.map(r => ({
//     CUSTOMER_NAME: r.name,
//     CURRENCY: "USD",   // example: hardcoded or derive from file
//     COUNTRY: r.code    // or however your mapping works
//   }));

//   // Insert into DB
//   await cds.transaction(req).run(
//     INSERT.into("app.dan.CUSTOMERS").entries(customers)
//   );

  return "Upload success";
}
