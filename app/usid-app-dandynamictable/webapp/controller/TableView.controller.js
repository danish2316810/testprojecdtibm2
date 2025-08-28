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
], (Controller, JSONModel, Column, Label, Button, Toolbar, ToolbarSpacer, TablePersoController, Title, Input,Text, persoService) => {
    "use strict";

    return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
        onInit() {
            // table configs
            this._config = {
                Nominations: {
                    entitySet: "/ContractErrorsView",
                    columns: ["terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode","Action"],
                    filters: ["ID", "terminalNo", "folioMo", "errorCode"]
                },
                Contracts: {
                    entitySet: "/NominationErrorsView",
                    columns: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate", "lastRetry", "reprocessCount", "createdAt", "errorCode", "Action"],
                    filters: ["ID", "nominationKey", "nominationItem", "errorCode"]
                }
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
            let oFilterBar = oView.byId("filterBar");

                 // 🔹 reset table
                oTable.removeAllColumns();

                // mark table type
                oTable.data("tableType", type.toLowerCase());

                // 🔹 build columns dynamically with unique IDs
                cfg.columns.forEach((fieldName, index) => {
                    let sLabel = this.oBundle.getText(fieldName, fieldName);
                    oTable.addColumn(new Column({
                        id: oView.createId(`col-${type.toLowerCase()}-${fieldName}-${Date.now()}-${index}`), // unique
                        header: new Label({ text: sLabel })
                    }));
                });

                // 🔹 build template for rows
                let that = this;
                let oTemplate = new sap.m.ColumnListItem({
                    cells: cfg.columns.map((fieldName, index) => {
                        if (fieldName === "Action") {
                            return new Button({
                                text: "Reprocess",
                                type: "Emphasized"
                                // press: that._onReprocess (if needed later)
                            }).bindProperty("visible", {
                                path: "enabledForReprocessing",
                                formatter: function (bValue) {
                                    return bValue === true;
                                }
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
                    oFilterBar.removeAllFilterGroupItems();
                    sap.ui.getCore().applyChanges(); // force rerender

                    cfg.filters.forEach((filterField, index) => {
                        let sLabel = this.oBundle.getText(filterField, filterField);

                        let oControl = new Input({
                            placeholder: `Enter ${sLabel}`
                            // liveChange: this._onLiveSearch.bind(this) 
                        });

                        oFilterBar.addFilterGroupItem(new sap.ui.comp.filterbar.FilterGroupItem({
                            groupName: "__basic",
                            name: `${type}-${filterField}-${Date.now()}-${index}`, // unique ID
                            label: sLabel,
                            control: oControl
                        }));
                    });

                    // 🔹 set dynamic toolbar title + personalization
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
