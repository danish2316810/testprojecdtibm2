  namespace app.dan;
  using { app.dan.CUSTOMERS } from './index';

  using { cuid } from '@sap/cds/common';

  entity salesOrder : cuid {
  key salesOrderId     : String(16);
    salesOrderValue  : String(16);
    date:Date;     
    customersUUID:UUID ;
    fKey1: Association to CUSTOMERS on fKey1.ID = customersUUID ;
  }
