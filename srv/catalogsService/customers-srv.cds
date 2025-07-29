using  app.dan as app from '../../db/';
@path:'MyServiceMain'
service MyService {

    entity CUST as projection on app.CUSTOMERS;
    entity SO as projection on app.salesOrder;

    action insertDataIntoDb(data:{
            idCheck:String;
            checkName:Boolean;
            checkStatus:String;
            checkBY:String;
    }) returns String;

}