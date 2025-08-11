const { createNewCustomer } = require('../utils/create/createNewCust');
const cds = require('@sap/cds');

module.exports = createCustomer;

async function createCustomer(req) {
  try {
    const newCustomer = req.data;
    const tx = cds.transaction(req);

    if (req.user && req.user.id !=="anonymous") { 
      // console.log('All user roles:', req.user.roles);
      // console.log('All user role names:', Object.keys(req.user.roles));
      // console.log('User is User:', req.user.is('User'));
      // console.log('User is Admin:', req.user.is('Admin'));
      // console.log('User is testprojectibm.User:', req.user.is('testprojectibm.User'));
      // console.log('User is testprojectibm.Admin:', req.user.is('testprojectibm.Admin'));

      if (req.user.is('User')) {
        return req.error(403, 'Not authorized to create customers');
      }
      if (req.user.is('Admin')) {
        const result = await createNewCustomer(tx, newCustomer);
        return result;
      }
      return req.error(403, 'No valid role found');
    } else {
      // No user - allow for local testing
      const result = await createNewCustomer(tx, newCustomer);
      return result;
    }

  } catch (err) {
    return req.error(500, 'Internal Server Error: ' + err.message);
  }
}
