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
    "../utils/persoService",
    "../utils/reuse",
    "sap/m/MessageBox"
], (Controller, JSONModel, Column, Label, Button, Toolbar, ToolbarSpacer, TablePersoController, Title, Input, Text, persoService,reuse,MessageBox) => {
    "use strict";

    return Controller.extend("usib.app.dan.usidappdandynamictable.controller.TableView", {
        onInit() {
            this._config=reuse.getConfig()
            this._defaultVisibleCols=reuse.getDefaultVisibleCols();

           
            
            // 🔹 Error handling: Validate i18n model
            try {
                this.oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                if (!this.oBundle) {
                    throw new Error("i18n model not found.");
                }
            } catch (oError) {
                console.error("Error in onInit: Failed to load i18n model.", oError);
                return;
            }

            
           

            // dropdown model
            let oModel = new JSONModel();
            oModel.setData({
                "ErrorTypes": [
                    { "key": "Nominations", "text": "Nomination Errors" },
                    { "key": "Contracts", "text": "Contract Errors" }
                ]
            });
            this.getView().setModel(oModel, "dropdownModel");
        },

        // dropdown select handler
        onSelectDropItem: function (oEvent) {
            // 🔹 Error handling: Validate selected item
            try {
                let Item = oEvent.getParameter("selectedItem")?.getProperty("key");
                if (!Item) {
                    throw new Error("No valid item selected in dropdown.");
                }
                this.Item1Text = oEvent.getParameter("selectedItem").getProperty("text");
                this._loadConfig(Item);
            } catch (oError) {
                console.error("Error in onSelectDropItem: Failed to process dropdown selection.", oError);
            }
        },

        // open personalization dialog
        onPersonalizePress: function () {
            // 🔹 Error handling: Validate TablePersoController
            try {
                if (!this._oTPC) {
                    throw new Error("TablePersoController is not initialized.");
                }
                this._oTPC.openDialog();
            } catch (oError) {
                console.error("Error in onPersonalizePress: Failed to open personalization dialog.", oError);
            }
        },

        // load config dynamically
        _loadConfig: function (type) {
            // 🔹 Error handling: Validate configuration and view
            try {
                if (!this._config[type]) {
                    throw new Error(`Configuration for type ${type} not found.`);
                }
                let cfg = this._config[type];
                let oView = this.getView();
                if (!oView) {
                    throw new Error("View not found.");
                }
                let oTable = oView.byId("idDynTable");
                if (!oTable) {
                    throw new Error("Table with ID 'idDynTable' not found.");
                }

                this.currentType = type;

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
                                type: "Emphasized",
                                press:(oEvent)=>{
                                    this._onReprocessBtn(oEvent)
                                }
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
                try {
                    oTable.bindItems({
                        path: cfg.entitySet,
                        template: oTemplate
                    });
                } catch (oError) {
                    throw new Error(`Failed to bind items to table for entity set ${cfg.entitySet}: ${oError.message}`);
                }

                // 🔹 build filters dynamically
                let oFilterBar = oView.byId("filterBar");
                if (!oFilterBar) {
                    throw new Error("FilterBar with ID 'filterBar' not found.");
                }
                oFilterBar.removeAllFilterGroupItems();
                sap.ui.getCore().applyChanges(); // force rerender

                cfg.filters.forEach((filterField, index) => {
                    let sLabel = this.oBundle.getText(filterField, filterField);
                    let oControl;

                    if (filterField === "errorCode") {
                        oControl = new sap.m.ComboBox({
                            placeholder: `Select ${sLabel}`,
                            items: {
                                path: "/ErrorCodes", // your model with values
                                template: new sap.ui.core.ListItem({
                                    key: "{errorCode}",
                                    text: "{errorCode}-{errorDesc}"
                                })
                            },
                            change: this._onLiveSearch.bind(this)
                        });
                    } else {
                        oControl = new Input({
                            placeholder: `Enter ${sLabel}`,
                            liveChange: (oEvent) => {
                                let sValue = oEvent.getParameter("value");
                                if (sValue || sValue === "") {
                                    this._onLiveSearch();
                                }
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
                    })));
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
            } catch (oError) {
                console.error(`Error in _loadConfig for type ${type}:`, oError);
            }
        },

        _onLiveSearch: function () {
            // 🔹 Error handling: Validate table and filter bar
            try {
                let view = this.getView();
                if (!view) {
                    throw new Error("View not found.");
                }
                let oTable = view.byId("idDynTable");
                if (!oTable) {
                    throw new Error("Table with ID 'idDynTable' not found.");
                }
                let oFilterBar = view.byId("filterBar");
                if (!oFilterBar) {
                    throw new Error("FilterBar with ID 'filterBar' not found.");
                }

                let aFilters = [];

                oFilterBar.getFilterGroupItems().forEach(oItem => {
                    let ctrl = oItem.getControl();
                    let sPath = oItem.data("property"); // 🔹 use property, not name
                    // 🔹 Error handling: Validate control and path
                    if (!ctrl || !sPath) {
                        console.warn(`Skipping filter: Invalid control or property for ${oItem.getName()}`);
                        return;
                    }

                    if (ctrl.isA("sap.m.Input")) {
                        let sValue = ctrl.getValue();
                        if (sValue && sValue.trim() !== "") {
                            aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.Contains, sValue));
                        }
                    } else if (ctrl.isA("sap.m.ComboBox")) {
                        let oSelectedItem = ctrl.getSelectedItem();
                        if (oSelectedItem) {
                            let sKey = oSelectedItem.getKey();
                            aFilters.push(new sap.ui.model.Filter(sPath, sap.ui.model.FilterOperator.EQ, sKey));
                        }
                    } else if (ctrl.isA("sap.m.DatePicker")) {
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
                try {
                    let oBinding = oTable.getBinding("items");
                    if (!oBinding) {
                        throw new Error("Table binding not found.");
                    }
                    oBinding.filter(aFilters);
                } catch (oError) {
                    throw new Error(`Failed to apply filters: ${oError.message}`);
                }
            } catch (oError) {
                console.error("Error in _onLiveSearch:", oError);
            }
        },

        // add/update toolbar
        _addToolbar: function (oTable) {
            // 🔹 Error handling: Validate table
            try {
                if (!oTable) {
                    throw new Error("Table object not provided.");
                }
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
            } catch (oError) {
                console.error("Error in _addToolbar:", oError);
            }
        },
        onLineItemClick:function(oEvent){
            var oTable = oEvent.getSource();
                var oSelectedItem = oTable.getSelectedItem();
                if (!oSelectedItem) {
                    return;
                }

                // Get table type (contractErrors or nominationErrors) - assume stored in table's custom data
                var sTableType = oTable.data("tableType"); // e.g., "contractErrors" or "nominationErrors"
                var oData = oSelectedItem.getBindingContext().getObject();

                // Get key configuration
                var oKeyModel = this.getView().getModel("keyConfig").getData();
                var aKeys = oKeyModel[sTableType].keys;
                var oDynamicKeys = {};
                    aKeys.forEach(function (sKey) {
                        oDynamicKeys[sKey] = oData[sKey] || "";
                    });

                    // Encode dynamic keys as a string (e.g., JSON or base64 for URL safety)
                    var sDynamicKeys = btoa(JSON.stringify(oDynamicKeys)); // Base64 encode for simplicity

                    // Navigate to detail page
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteDetailView", {
                        tableType: sTableType,
                        dynamicKeys: sDynamicKeys
                    });
            // let oObject = oEvent.getParameter("listItem").getBindingContext().getObject();
            // let type = this.currentType;
            // let type1= this._config[type].entitySet.replace(/^\//, "")
                
            // let oRouter = this.getOwnerComponent().getRouter()
            // oRouter.navTo("RouteDetailView", {
            //     id: oObject.ID,
            //     entitySet: type1,
            //     type:type
                
            // })
         },
         _onReprocessBtn: function(oEvent) {
            let entityName = this.currentType === "Nominations" 
    ? "NominationErrors" 
    : "ContractErrors";
    let mKeyConfig = {
        "ContractErrors": ["ID", "terminalNo", "folioMo"],
        "NominationErrors": ["ID", "nominationKey", "nominationItem"]
    };

              const oObject=oEvent.getSource().getBindingContext().getObject();
              let aKeys = mKeyConfig[entityName].map(function (sKey) {
        return {
            keyName: sKey,
            value: oObject[sKey]
        };
    });

          const data={
        entityName: entityName,
        sourceSystem: oObject.sourceSystem || "GSAP", // or take from object
        keys: aKeys
    };
          const modulePath="";//sap.ui.require.toUrl("usib/app/dan/usidappdandynamictable")
          const dataFinal={data};
          this.getView().setBusy(true)
          $.ajax({
            url:"/odata/v4/error-mangement/reprocessFromUi",
            type:"POST",
            data:JSON.stringify(dataFinal),
            contentType:'application/json',
            success:(odata)=>{
                if(odata){
                    this.getView().setBusy(false);
                    MessageBox.show(odata.value)
                    
                    
                }
            },
            error:(oError)=>{
                this.getView().setBusy(false);
                MessageBox.error(oError.value)
            }
          })

        }
    });
});