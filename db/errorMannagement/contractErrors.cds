namespace app.dan;

using { cuid } from '@sap/cds/common';
using  app.types as Types from'../../db/index';
using app.dan.InterfaceData from './index';

entity ContractErrors : cuid {
    key terminalNo:Types.TerminalNo;
    key folioMo:Types.FolioMo;
        invNo:Types.InvNo not null;
        lastRetry:DateTime;
        reprocessCount:Decimal(3) default 0;
        interfaceUUID: UUID not null;
        interfaceData:Association to InterfaceData on interfaceData.ID=interfaceUUID;
    
};
view ContractErrorsView as select from ContractErrors 
left join InterfaceData on ContractErrors.interfaceUUID=InterfaceData.ID
{
    key ContractErrors.ID as ID,
    key ContractErrors.terminalNo as terminalNo,
        ContractErrors.folioMo as folioMo,
        ContractErrors.invNo as invNo,
        ContractErrors.lastRetry as lastRetry,
        ContractErrors.reprocessCount as reprocessCount,

        InterfaceData.error.errorCode as errorCode,
        InterfaceData.error.errorDesc as errorDesc,
        InterfaceData.error.enabledForReprocessing as errorEnabledForReprocessing,
        InterfaceData.sourceSystem as sourceSystem,
        InterfaceData.enabledForReprocessing as enabledForReprocessing,
        InterfaceData.httpErroMessage as httpErroMessage,
        InterfaceData.httpErrorCode as httpErrorCode,
        InterfaceData.enabledForReprocessing as interfaceEnabledForReprocessing

}
