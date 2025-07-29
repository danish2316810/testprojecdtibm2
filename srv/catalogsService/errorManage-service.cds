using app.dan as app from '../../db';


service ErrorMangement {

    
    view ContractErrorsView as select from app.ContractErrorsView{
        *,
    };
  type payload{
    source:String;
    interface:String;
    errorCode:String;
    fields:array of {
      keys:String;
      value:String;
    }
  }

  action createErrorRecord(data: payload) returns String;
}