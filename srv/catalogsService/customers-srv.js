const cds = require('@sap/cds');
// import your custome create logic
const createCustomer= require ('../customLogic/createCustomer')

// the service (myServcie) is exactly same as the service name in your cds file i.e. customer-srv.cds
class MyService extends cds.ApplicationService{

    init(){
        // CUST is exactly the same exposed entity that is there in customer-srv.cds file
        const { CUST  }= this.entities;
        this.on('CREATE', CUST , createCustomer);
        return super.init()
    }
}
module.exports={ MyService}