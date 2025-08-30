sap.ui.define([], function () {
    "use strict";

    return {
        getConfig: function () {
            return {
                Contracts: {
                    entitySet: "/ContractErrorsView",
                    columns: ["ID","terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode","Action"],
                    filters: ["ID", "terminalNo", "folioMo", "errorCode"],
                    visibleFilters: ["terminalNo", "errorCode"]
                },
                 Nominations: {
                    entitySet: "/NominationErrorsView",
                    columns: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate", "lastRetry", "reprocessCount", "createdAt", "errorCode", "Action"],
                    filters: ["ID", "nominationKey", "nominationItem", "errorCode"],
                    visibleFilters: ["ID", "errorCode"]
                   
                }
            };
        },

        getDefaultVisibleCols: function () {
            return {
                 Nominations: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate","Action"],
                    Contracts: ["ID","terminalNo", "folioMo", "invNo", "reprocessCount", "createdAt", "errorCode","Action"]
            };
        }
    };
});

 //  this._config = {
            //     Contracts: {
            //         entitySet: "/ContractErrorsView",
            //         columns: ["ID","terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode","Action"],
            //         filters: ["ID", "terminalNo", "folioMo", "errorCode"],
            //         visibleFilters: ["terminalNo", "errorCode"]
            //     },
            //     Nominations: {
            //         entitySet: "/NominationErrorsView",
            //         columns: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate", "lastRetry", "reprocessCount", "createdAt", "errorCode", "Action"],
            //         filters: ["ID", "nominationKey", "nominationItem", "errorCode"],
            //         visibleFilters: ["ID", "errorCode"]
                   
            //     }
            // };

            // this._defaultVisibleCols = {
                //     Nominations: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate","Action"], // preselected
                //     Contracts: ["ID","terminalNo", "folioMo", "invNo", "reprocessCount", "createdAt", "errorCode","Action"], // preselected
                // };