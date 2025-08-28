sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Column",
    "sap/m/Label",
    "sap/m/Button",
    "sap/m/Toolbar",
    "sap/m/ToolbarSpacer",
    "sap/m/TablePersoController",
    "../utils/persoService"
], (Controller, JSONModel, Column, Label, Button, Toolbar, ToolbarSpacer, TablePersoController, persoService) => {
    "use strict";

    return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
        onInit() {
           
            // table configs
            this._config = {
                Nominations: {
                    entitySet: "/ContractErrorsView",
                    columns: [ "terminalNo", "folioMo", "invNo", "lastRetry", "reprocessCount", "createdAt", "errorCode"],
                    filters: ["ID", "terminalNo", "folioMo", "errorCode"]
                },
                Contracts: {
                    entitySet: "/NominationErrorsView",
                    columns: ["ID", "nominationKey", "nominationItem", "diliveryReciept", "scheduleDate", "lastRetry", "reprocessCount", "createdAt", "errorCode"],
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
        onSelectDropItem: function (oEvent) {
            let Item = oEvent.getParameter("selectedItem").getProperty("key");
            this.Item1Text=oEvent.getParameter("selectedItem").getProperty("text");
            
            this._loadConfig(Item);
        },
        onPersonalizePress: function () {
            if (this._oTPC) {
                this._oTPC.openDialog();
            }
        },

        _loadConfig: function (type) {
            this.currentType = type;
            let cfg = this._config[type];
            let oView = this.getView();
            let oTable = oView.byId("idDynTable");

            // remove existing columns
            oTable.getColumns().forEach(col => col.destroy());
            oTable.removeAllColumns();

            // ⭐ mark table with current type for persoService
            oTable.data("tableType", type.toLowerCase());

            // create stable-ID columns dynamically
            cfg.columns.forEach((fieldName, index) => {
                let sLabel = this.oBundle.getText(fieldName, fieldName);
                oTable.addColumn(new Column({
                    id: oView.createId(`col-${type.toLowerCase()}-${fieldName}`),
                    // id: oView.createId("col-" + type.toLowerCase() + "-" + fieldName) 
                    header: new Label({ text: sLabel })
                }));
            });

            
            this._addToolbar(oTable);

            // add personalisation 
            if (this._oTPC) {
                this._oTPC.destroy(); // remove old controller
            }
            // 💡 delay activation until after rendering
            sap.ui.getCore().applyChanges();

            this._oTPC = new sap.m.TablePersoController({
                table: oTable,
                persoService: persoService
            });

            this._oTPC.activate();
            console.log("Loading table type:", type.toLowerCase());
            console.log("Table instance:", oTable);
           console.log("Loaded table type:", type.toLowerCase(), "Column count:", oTable.getColumns().length);
                    },

        _addToolbar: function (oTable) {
            let sErrorData = this.Item1Text;
                    if (!this._oToolbarTitle) {
                        // create title only once
                        this._oToolbarTitle = new sap.m.Title({
                            text: sErrorData,
                            level: "H2"
                        });

            let oToolbar = new sap.m.Toolbar({
                            content: [
                                this._oToolbarTitle,
                                new sap.m.ToolbarSpacer(),
                                new sap.m.Button({
                                    text: this.oBundle.getText("personalize", "Personalize"),
                                    icon: "sap-icon://action-settings",
                                    press: this.onPersonalizePress.bind(this)
                                })
                            ]
                        });

                        oTable.setHeaderToolbar(oToolbar);
                    }

                    // always update the text
                    this._oToolbarTitle.setText(sErrorData);
                          
                }

                   
    });
});
