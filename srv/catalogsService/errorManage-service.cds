using app.dan as app from '../../db';


service ErrorMangement {

    entity ErrorCodes as projection on app.ErrorCodes;
    
    view ContractErrorsView as select from app.ContractErrorsView{
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
}