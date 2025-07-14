
module.exports = createCustomer;


async function createCustomer(req) {
  try {
    const newCustomer = req.data;
    const tx = cds.transaction(req);
    const result = await tx.run(INSERT.into('APP_CUSTOMERS').entries(newCustomer));
    return result;
  } catch (err) {
    req.error(500, 'Internal Server Error: ' + err.message);
  }
}
