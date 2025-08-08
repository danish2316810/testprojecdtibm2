const {createNewCustomer}= require('../utils/create/createNewCust')
module.exports = createCustomer;


async function createCustomer(req) {
  try {
    const newCustomer = req.data;
    const tx = cds.transaction(req);
    // const result = await tx.run(INSERT.into('APP_DAN_CUSTOMERS').entries(newCustomer));
    const result=await createNewCustomer(tx, newCustomer)
    return result;
  } catch (err) {
    req.error(500, 'Internal Server Error: ' + err.message);
  }
}
