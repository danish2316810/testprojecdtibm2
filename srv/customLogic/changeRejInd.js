// const { createNewCustomer } = require('../utils/create/');
const cds = require('@sap/cds');

module.exports = changeRejInd;

async function changeRejInd(req) {
  const { ID, terminalNo, folioMo } = req.params[0]; // entity keys
  const { newValue } = req.data; // action parameter

  // Update the record in DB
  await UPDATE('APP_DAN_CONTRACTERRORS')
    .set({ rejectInd: newValue })
    .where({ ID, terminalNo, folioMo });

  // Return the updated entity
  const updated = await SELECT.one.from('APP_DAN_CONTRACTERRORS')
    .where({ ID, terminalNo, folioMo });

  return updated;
}
