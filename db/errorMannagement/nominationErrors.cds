namespace app.dan;

using { cuid,managed } from '@sap/cds/common';
using  app.types as Types from'../../db/index';
using app.dan.InterfaceData from './index';

entity NominationErrors : cuid,managed {
    key nominationKey   :Types.NominationKey;
    key nominationItem  :Types.NominationItem;
        diliveryReciept :String(1);
        shippingType    :String(2);
        scheduleDate    :DateTime;
        lastRetry       :DateTime;
        transportSystem :String(10);
        reprocessCount  :Decimal(3) default 0;
        interfaceUUID   :UUID not null;
        interfaceData   :Association to InterfaceData on interfaceData.ID=interfaceUUID;
    
};
view NominationErrorsView as select from NominationErrors
left join InterfaceData on NominationErrors.interfaceUUID = InterfaceData.ID
{
    key NominationErrors.ID as ID,
    key NominationErrors.nominationKey as nominationKey,
        NominationErrors.nominationItem as nominationItem,
        NominationErrors.diliveryReciept as diliveryReciept,
        NominationErrors.scheduleDate as scheduleDate,
        NominationErrors.transportSystem as transportSystem,
        NominationErrors.lastRetry as lastRetry,
        NominationErrors.shippingType as shippingType,
        NominationErrors.reprocessCount as reprocessCount,
        NominationErrors.createdBy as createdBy,
        NominationErrors.createdAt as createdAt,
        NominationErrors.modifiedAt as modifiedAt,
        NominationErrors.modifiedBy as modifiedBy,

        InterfaceData.error.errorCode as errorCode,
        InterfaceData.error.errorDesc as errorDesc,
        InterfaceData.error.enabledForReprocessing as errorEnabledForReprocessing,
        InterfaceData.sourceSystem as sourceSystem,
        InterfaceData.enabledForReprocessing as enabledForReprocessing,
        InterfaceData.httpErroMessage as httpErroMessage,
        InterfaceData.httpErrorCode as httpErrorCode,
        InterfaceData.enabledForReprocessing as interfaceEnabledForReprocessing

}