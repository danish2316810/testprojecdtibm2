namespace app.dan;

using { cuid } from '@sap/cds/common';
using  app.dan.ErrorCodes from './index';


entity InterfaceData : cuid {
    sourceSystem    :String(100);
    iFlowName       :String(225) not null;
    enabledForReprocessing:Boolean;
    techTableName   :String(59);
    error           :Association to ErrorCodes not null;
    httpErrorCode   :String(50);
    httpErroMessage :String(100);
}