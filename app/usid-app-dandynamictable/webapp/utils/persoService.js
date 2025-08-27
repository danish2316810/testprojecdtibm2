sap.ui.define([], function () {
    "use strict";

    var oData = {};

    return {
        getPersData: function (oTable) {
            var oDeferred = jQuery.Deferred();

            if (!oTable) {
                console.error("getPersData: oTable is undefined!");
            } else {
                console.log("getPersData: oTable received", oTable);
            }

            let sType = oTable?.data("tableType");
            console.log("getPersData: tableType =", sType);

            let aColumns = [];

            if (sType === "nominations") {
                aColumns = [
                    { id: oTable.getId() + "--col-nominations-terminalNo", order: 0, text: "Terminal No", visible: true },
                    { id: oTable.getId() + "--col-nominations-folioMo", order: 1, text: "Folio Mo", visible: true },
                    { id: oTable.getId() + "--col-nominations-invNo", order: 2, text: "Inv No", visible: true }
                ];
            } else if (sType === "contracts") {
                aColumns = [
                    { id: oTable.getId() + "--col-contracts-ID", order: 0, text: "ID", visible: true },
                    { id: oTable.getId() + "--col-contracts-nominationKey", order: 1, text: "Nomination Key", visible: true },
                    { id: oTable.getId() + "--col-contracts-nominationItem", order: 2, text: "Nomination Item", visible: true }
                ];
            }

            oDeferred.resolve(
                oData[sType] || {
                    _persoSchemaVersion: "1.0",
                    aColumns: aColumns
                }
            );

            return oDeferred.promise();
        },

        setPersData: function (oBundle, oTable) {
            var oDeferred = jQuery.Deferred();
            let sType = oTable?.data("tableType");
            if (sType) {
                oData[sType] = oBundle;
            } else {
                oData = oBundle;
            }
            console.log("setPersData: saved data for tableType =", sType, oBundle);
            oDeferred.resolve();
            return oDeferred.promise();
        },

        delPersData: function (oTable) {
            var oDeferred = jQuery.Deferred();
            let sType = oTable?.data("tableType");
            if (sType) {
                delete oData[sType];
            } else {
                oData = {};
            }
            console.log("delPersData: deleted data for tableType =", sType);
            oDeferred.resolve();
            return oDeferred.promise();
        }
    };
});
