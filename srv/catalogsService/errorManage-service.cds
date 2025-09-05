using app.dan as app from '../../db';


service ErrorMangement {

    entity ErrorCodes as projection on app.ErrorCodes;
//     entity ErrorCodes as select from app.ErrorCodes {
//     *,
//     CAST (
//         errorCode as Integer
//     )as errorCodeasint:Integer
// }
    
    view ContractErrorsView as select from app.ContractErrorsView{
        *,
    };
    entity ContractErrors as select from app.ContractErrors{
        *,
    } actions {
      // @(restrict:[
      //   {grant:'EXECUTE', to:'User'}
      // ])
      action changeRejInd(newValue : String)returns ContractErrors
    };
    view NominationErrorsView as select from app.NominationErrorsView{
        *,
    };
  type payload{
    source:String;
    interface:String;
    errorCode:String;
    iFlowName:String;
    httpErrorCode:String;
    enabledForReprocessing:String;
    fields:array of {
      keys:String;
      value:String;
    }
  }
   action createErrorRecord(data: payload) returns String;

   type payloadFromUi{
    entityName:String;
    sourceSystem:String;
    keys: many {
      keyName:String;
      value:String;
    }

    
  }
  action reprocessFromUi(data:payloadFromUi) returns String;
}