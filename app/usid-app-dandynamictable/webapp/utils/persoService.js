sap.ui.define([], function () {
    "use strict";
     var _oTable;              // Reference to the current table
    var _sTableType;          // Type of the current table
    var _mDefaultVisibleCols; // Map of tableType → initially visible columns

    // Configure how many columns should be visible per table type
    // Just change the `visibleColumns` list to control which ones start visible
    _mDefaultVisibleCols = {
        "nominations": ["NominationId", "StartDate", "EndDate", "EnableReprocessing"],
        "contracts": ["ContractId", "Supplier", "EnableReprocessing"],
       
        
    };

    var oData = {};

    return {
        getPersData: function () {
        console.log("getPersData called for tableType =", this._tableType);
        if (!this._oBundle) {
            this._oBundle = {};
        }

        // Default configurations per table type
        var defaults = {
            nominations: {
                aColumns: [
                    { id: "col1", visible: false },
                    { id: "col2", visible: true },
                    { id: "col3", visible: true },
                    { id: "col4", visible: false },
                    { id: "col5", visible: false },
                    { id: "col6", visible: false }
                ]
            },
            contracts: {
                aColumns: [
                    { id: "col1", visible: true },
                    { id: "col2", visible: true },
                    { id: "col3", visible: true },
                    { id: "col4", visible: false },
                    { id: "col5", visible: false },
                    { id: "col6", visible: false },
                    { id: "col7", visible: false }
                ]
            }
        };

        // Return saved data if exists, otherwise defaults
        return jQuery.Deferred().resolve(
            this._oBundle[this._tableType] || defaults[this._tableType] || {}
        ).promise();
    },

        setPersData: function (oBundle) {
        console.log("setPersData: saved data for tableType =", this._tableType, oBundle);
        this._oBundle[this._tableType] = oBundle;
        return jQuery.Deferred().resolve().promise();
    },

    setTableType: function (sType) {
        this._tableType = sType;
    }
    };
});
