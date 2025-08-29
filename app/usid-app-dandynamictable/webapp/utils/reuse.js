sap.ui.define([], function () {
    "use strict";

    return {
        getConfig: function () {
            return {
                Nominations: {
                    entitySet: "/ContractErrorsView",
                    columns: ["ID", "terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode", "Action"],
                    filters: ["ID", "terminalNo", "folioMo", "errorCode"],
                    visibleFilters: ["terminalNo", "errorCode"]
                },
                Contracts: {
                    entitySet: "/NominationErrorsView",
                    columns: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate", "lastRetry", "reprocessCount", "createdAt", "errorCode", "Action"],
                    filters: ["ID", "nominationKey", "nominationItem", "errorCode"],
                    visibleFilters: ["ID", "errorCode"]
                }
            };
        },

        getDefaultVisibleCols: function () {
            return {
                Nominations: ["terminalNo", "folioMo", "invNo","Action"],
                Contracts: ["ID", "nominationKey", "nominationItem","Action"]
            };
        }
    };
});
