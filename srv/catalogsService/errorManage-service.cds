using app.dan as app from '../../db';

service ErrorMangement {

    
    view ContractErrorsView as select from app.ContractErrorsView{
        *,
    };
  

  action ReProcess()
}