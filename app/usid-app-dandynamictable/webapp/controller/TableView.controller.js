sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Button",
    "sap/m/Toolbar",
    "sap/m/ToolbarSpacer",
    "sap/m/TablePersoController",
    "sap/m/Title",
    "sap/m/Input",
    "sap/m/Text",
    "../utils/persoService"
], (Controller, JSONModel, Column, Label, Button, Toolbar, ToolbarSpacer, TablePersoController, Title, Input,Text,persoService) => {
    "use strict";

    return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
        onInit() {
            // table configs
            this._config = {
                Nominations: {
                    entitySet: "/ContractErrorsView",
                    columns: ["ID","terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode","Action"],
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
            // Define initial visible columns per table type
                this._defaultVisibleCols = {
                    Nominations: ["terminalNo", "folioMo", "invNo"], // preselected
                    Contracts: ["ID", "nominationKey", "nominationItem"], // preselected
                };

            // dropdown model
            let oModel = new JSONModel();
            oModel.setData({
                "ErrorTypes": [
                    { "key": "Nominations", "text": "Nomination Errors" },
                    { "key": "Contracts", "text": "Contract Errors" }
                ]
            });
            this.getView().setModel(oModel, "dropdownModel");

            this.oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        // dropdown select handler
        onSelectDropItem: function (oEvent) {
            let Item = oEvent.getParameter("selectedItem").getProperty("key");
            this.Item1Text = oEvent.getParameter("selectedItem").getProperty("text");
            this._loadConfig(Item);
        },

        // open personalization dialog
        onPersonalizePress: function () {
            if (this._oTPC) {
                this._oTPC.openDialog();
            }
        },

        // load config dynamically
       _loadConfig: function (type) {
    this.currentType = type;
    let cfg = this._config[type];
    let oView = this.getView();
    let oTable = oView.byId("idDynTable");
    

    

    // 🔹 reset table
    oTable.removeAllColumns();
    oTable.unbindItems();

    // mark table type
    oTable.data("tableType", type.toLowerCase());

    // 🔹 build columns dynamically with unique IDs & initial visibility
    cfg.columns.forEach((fieldName, index) => {
        let sLabel = this.oBundle.getText(fieldName, fieldName);
        oTable.addColumn(new Column({
            id: oView.createId(`col-${type.toLowerCase()}-${fieldName}-${Date.now()}-${index}`), 
            header: new Label({ text: sLabel }),
            visible: this._defaultVisibleCols[type].includes(fieldName) // ✅ initial visibility
        }));
    });

    // 🔹 build template for rows
    let oTemplate = new sap.m.ColumnListItem({
        cells: cfg.columns.map((fieldName) => {
            if (fieldName === "Action") {
                return new Button({
                    text: "Reprocess",
                    type: "Emphasized"
                }).bindProperty("visible", {
                    path: "enabledForReprocessing",
                    formatter: (bValue) => bValue === true
                });
            } else {
                return new Text({ text: `{${fieldName}}` });
            }
        })
    });

    // 🔹 bind items to table
    oTable.bindItems({
        path: cfg.entitySet,
        template: oTemplate
    });

    // 🔹 build filters dynamically
    let oFilterBar = oView.byId("filterBar");
    oFilterBar.removeAllFilterGroupItems();
    sap.ui.getCore().applyChanges(); // force rerender

    cfg.filters.forEach((filterField, index) => {
        let sLabel = this.oBundle.getText(filterField, filterField);
        let oControl;

        if(filterField==="errorCode"){
            oControl=new sap.m.ComboBox({
                placeholder: `Select ${sLabel}`,
                items: {
                path: "/ErrorCodes", // your model with values
                template: new sap.ui.core.ListItem({
                    key: "{errorCode}",
                    text: "{errorCode}-{errorDesc}"
                })
                        },
                change: this._onLiveSearch.bind(this)        
            })
        }else{
            oControl = new Input({
            placeholder: `Enter ${sLabel}`,
            liveChange: (oEvent)=>{
                let sValue=oEvent.getParameter("value");
                this._onLiveSearch()
            }
        });
        }
        

        oFilterBar.addFilterGroupItem(new sap.ui.comp.filterbar.FilterGroupItem({
            groupName: "__basic",
            name: `${type}-${filterField}-${Date.now()}-${index}`, // unique
            label: sLabel,
            control: oControl,
            
            data: { property: filterField } 
        }).addCustomData(new sap.ui.core.CustomData({
        key: "property",
        value: filterField
    }))
    );
    });

    // 🔹 personalization toolbar
    persoService.setTableType(type.toLowerCase());
    this._addToolbar(oTable);

    if (this._oTPC) {
        this._oTPC.destroy(); // destroy old TablePersoController
    }
    sap.ui.getCore().applyChanges();

    this._oTPC = new sap.m.TablePersoController({
        table: oTable,
        persoService: persoService
    });
    this._oTPC.activate();
},

       _onLiveSearch: function () {
    let view = this.getView();
    let oTable = view.byId("idDynTable");
    let oFilterBar = view.byId("filterBar");

    let aFilters = [];

    oFilterBar.getFilterGroupItems().forEach(oItem => {
        let ctrl = oItem.getControl();
        let sPath = oItem.data("property"); // 🔹 use property, not name

        if (ctrl.isA("sap.m.Input")) {
            let sValue = ctrl.getValue();
            if (sValue) {
                aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.Contains, sValue));
            }
        } 
        else if (ctrl.isA("sap.m.ComboBox")) {
            let oSelectedItem = ctrl.getSelectedItem();
            if (oSelectedItem) {
                let sKey = oSelectedItem.getKey();
                aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.EQ, sKey));
            }
        } 
        else if (ctrl.isA("sap.m.DatePicker")) {
            let oDate = ctrl.getDateValue();
            if (oDate) {
                let sISODate = oDate.toISOString().split("T")[0];
                if (sPath === "StartDate") {
                    aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.GE, sISODate));
                } else if (sPath === "EndDate") {
                    aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.LE, sISODate));
                }
            }
        }
    });

    // apply filters to table
    oTable.getBinding("items").filter(aFilters);
},


        // add/update toolbar
        _addToolbar: function (oTable) {
            let sErrorData = this.Item1Text || "Error Data";

            if (!this._oToolbarTitle) {
                this._oToolbarTitle = new Title({
                    text: sErrorData,
                    level: "H2"
                });

                let oToolbar = new Toolbar({
                    content: [
                        this._oToolbarTitle,
                        new ToolbarSpacer(),
                        new Button({
                            text: this.oBundle.getText("personalize", "Personalize"),
                            icon: "sap-icon://action-settings",
                            press: this.onPersonalizePress.bind(this)
                        })
                    ]
                });

                oTable.setHeaderToolbar(oToolbar);
            }

            // always update title
            this._oToolbarTitle.setText(sErrorData);
        }
    });
});
