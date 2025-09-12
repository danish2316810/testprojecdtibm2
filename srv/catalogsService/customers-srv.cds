using  app.dan as app from '../../db/';
@path:'MyServiceMain'
service MyService {
     @(restrict:[
      {
        grant:[ READ],
        to:'User'
      },
      {
        grant:[READ,UPDATE,DELETE,CREATE],
        to:'Admin'
      }
    ])
    entity CUST as projection on app.CUSTOMERS;
    action uploadCustomer(fileName : String, payload : String) returns String;
    entity SO as projection on app.salesOrder;

    action insertDataIntoDb(data:{
            idCheck:String;
            checkName:Boolean;
            checkStatus:String;
            checkBY:String;
    }) returns String;

}