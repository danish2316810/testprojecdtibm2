namespace app;
using { cuid } from '@sap/cds/common';


entity CUSTOMERS : cuid {
    CUSTOMER_NAME:String(100);
    CURRENCY:String(3);
    COUNTRY:String(50);    
}








