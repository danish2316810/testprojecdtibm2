// srv/changeRejInd.js
const cds = require('@sap/cds');
const { getRoles } = require('../utils/create/roleCheck');

module.exports = changeRejInd;

async function changeRejInd(req) {
  let newValue = req.data.newValue; 
  let { authorized } = getRoles(req);  // getRoles returns an object

  if (authorized) {
    console.log('All user roles:', req.user.roles);
    console.log('All user role names:', Object.keys(req.user.roles));
    console.log('User is User:', req.user.is('User'));
    console.log('User is Admin:', req.user.is('Admin'));
    console.log('User is testprojectibm.User:', req.user.is('testprojectibm.User'));
    console.log('User is testprojectibm.Admin:', req.user.is('testprojectibm.Admin'));

    const result = await updateValue(req, newValue);
    return result;
  } else {
    // still run the update when unauthorized (your original code)
    const result = await updateValue(req, newValue);
    return result;
  }
}

async function updateValue(req, newValue) {
  const { ID, terminalNo, folioMo } = req.params[0];
  newValue = (newValue === "I") ? "_" : "I";

  await UPDATE('APP_DAN_CONTRACTERRORS')
    .set({ rejectInd: newValue })
    .where({ ID, terminalNo, folioMo });

  return await SELECT.one.from('APP_DAN_CONTRACTERRORS')
    .where({ ID, terminalNo, folioMo });
}
