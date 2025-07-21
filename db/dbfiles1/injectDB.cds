namespace db;
// using { cuid } from '@sap/cds/common';


entity CHECK{
    key idCheck:String(20);
        checkName:Boolean;
            checkStatus:String(100);
                checkBY: String(100);
                }
    