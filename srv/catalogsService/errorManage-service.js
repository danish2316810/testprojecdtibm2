const cds = require('@sap/cds');
// import your custome create logic

const createErrorRecord=require('../customLogic/createErrorRecord');


// the service (myServcie) is exactly same as the service name in your cds file i.e. customer-srv.cds
class ErrorMangement extends cds.ApplicationService{

    init(){       
        this.on('createErrorRecord', createErrorRecord)
        return super.init()
    }
}
module.exports= ErrorMangement