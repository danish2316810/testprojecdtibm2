const cds = require('@sap/cds');
// import your custome create logic

const createErrorRecord=require('../customLogic/createErrorRecord');
const reprocessFromUi=require('../customLogic/reprocessFromUi');
const changeRejInd=require('../customLogic/changeRejInd');
const clearEntries=require('../customLogic/clearEntries');


// the service (myServcie) is exactly same as the service name in your cds file i.e. customer-srv.cds
class ErrorMangement extends cds.ApplicationService{

    init(){       
        this.on('createErrorRecord', createErrorRecord);
        this.on('reprocessFromUi', reprocessFromUi);
        this.on('changeRejInd','ContractErrors', changeRejInd);
        this.on('clearEntries', clearEntries.onClearEntries)
        return super.init();
    }
}
module.exports= ErrorMangement