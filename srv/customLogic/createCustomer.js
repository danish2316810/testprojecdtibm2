const {createNewCustomer}= require('../utils/create/createNewCust')
module.exports = createCustomer;


async function createCustomer(req) {
  try {
    const newCustomer = req.data;
    const tx = cds.transaction(req);
    // const result = await tx.run(INSERT.into('APP_DAN_CUSTOMERS').entries(newCustomer));
    
              console.log('All user roles:', req.user.roles); // object
              console.log('All user role names:', Object.keys(req.user.roles)); // array of role names
              console.log('User is User:', req.user.is('User'));
              console.log('User is Admin:', req.user.is('Admin'));
              console.log('User is testprojectibm.User:', req.user.is('testprojectibm.User'));
              console.log('User is testprojectibm.Admin:', req.user.is('testprojectibm.Admin'));


    if (req.user.is('User')) { // Role name exactly as in xs-security.json
      return req.error(403, 'Not authorized to create customers');
    }
     if (req.user.is('Admin')) {
      const newCustomer = req.data;
      const tx = cds.transaction(req);
      const result = await createNewCustomer(tx, newCustomer);
      return result;
    }
    // const result=await createNewCustomer(tx, newCustomer)
    // return result;
  } catch (err) {
    req.error(500, 'Internal Server Error: ' + err.message);
  }
}
