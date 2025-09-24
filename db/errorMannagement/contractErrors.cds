namespace app.dan;

using { cuid,managed } from '@sap/cds/common';
using  app.types as Types from'../../db/index';
using app.dan.InterfaceData from './index';

entity ContractErrors : cuid,managed {
    key terminalNo:Types.TerminalNo;
    key folioMo:Types.FolioMo;
        invNo:Types.InvNo not null;
        rejectInd:String(1);
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
    key ContractErrors.folioMo as folioMo,
        ContractErrors.invNo as invNo,
        ContractErrors.rejectInd as rejectInd,
        ContractErrors.lastRetry as lastRetry,
        ContractErrors.reprocessCount as reprocessCount,
        ContractErrors.createdBy as createdBy,
        ContractErrors.createdAt as createdAt,
        ContractErrors.modifiedAt as modifiedAt,
        ContractErrors.modifiedBy as modifiedBy,

        InterfaceData.error.errorCode as errorCode,
        InterfaceData.error.errorDesc as errorDesc,
        InterfaceData.error.enabledForReprocessing as errorEnabledForReprocessing,
        InterfaceData.sourceSystem as sourceSystem,
        InterfaceData.enabledForReprocessing as enabledForReprocessing,
        InterfaceData.httpErroMessage as httpErroMessage,
        InterfaceData.httpErrorCode as httpErrorCode,
        InterfaceData.enabledForReprocessing as interfaceEnabledForReprocessing

}
