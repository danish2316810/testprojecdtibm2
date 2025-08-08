const cds=require('@sap/cds')

module.exports={createNewCustomer}

async function createNewCustomer(tx,newCustomer) {
    const result=await tx.run(INSERT.into("APP_DAN_CUSTOMERS").entries(newCustomer));
    return result;
}