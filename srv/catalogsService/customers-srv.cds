using  app from '../../db';
@path:'MyServiceMain'
service MyService {

    entity CUST as projection on app.CUSTOMERS;
    entity SO as projection on app.salesOrder;

}