const cds = require('@sap/cds');
// import your custome create logic

const createErrorRecord=require('../customLogic/createErrorRecord');
const reprocessFromUi=require('../customLogic/reprocessFromUi')


// the service (myServcie) is exactly same as the service name in your cds file i.e. customer-srv.cds
class ErrorMangement extends cds.ApplicationService{

    init(){       
        this.on('createErrorRecord', createErrorRecord)
        this.on('reprocessFromUi', reprocessFromUi)
        return super.init()
    }
}
module.exports= ErrorMangement