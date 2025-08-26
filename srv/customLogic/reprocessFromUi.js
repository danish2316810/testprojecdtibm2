    const cds= require('@sap/cds');

    module.exports =onReprocessFormUi
    // Main entry point
    async function onReprocessFormUi(req) {
        const { data } = req.data;
        const entities = cds.entities("app.dan");
        const entity = entities[data.entityName];
        let rResponse = "";

        if (entity) {
            // Call our simplified mock reprocess
            const fReprocessRes = await formMockReprocess(req, entity, data.keys);
            if (fReprocessRes) {
                rResponse = "Reprocessing triggered.";
            }
        } else {
            req.error(buildErrorMessages.buildErrorWithMsg("Wrong Entity details"));
        }

        return rResponse;
    }

    // Simplified reprocess function (no CPI, no Blob)
    async function formMockReprocess(req, entity, keyFields) {
        const aEntityData = await getEntityData(req, entity, keyFields);
        let oReprocessRes = false;

        if (aEntityData?.length > 0) {
            oReprocessRes = true;

            // ⬇️ Instead of forming CPI payload and sending to CPI,
            // just simulate reprocess + increment reprocessCount
            for (const record of aEntityData) {
                await UPDATE(entity)
                    .set({ reprocessCount: { '+=': 1 }, // increase by 1
                        lastRetry: new Date()  
                    }) 
                    .where({ ID: record.ID }); // assumes you have an ID field
            }
        }

        return oReprocessRes;
    }

    // Get entity data like before (only SELECT + WHERE)
    async function getEntityData(req, entity, keyFields) {
        const keys = {};
        keyFields.forEach(key => {
            keys[key.keyName] = key.value;
        });

        let entityData = "";

        if (entity.name.includes("NominationErrors")) {
            entityData = await SELECT.from(entity)
                .columns('*', 'interfaceData.sourceSystem')
                .where({
                    nominationKey: keys.nominationKey,
                    nominationItem: keys.nominationItem
                })
                .and("status_code is not null")
                .and("status_code != 'RP'")
                .orderBy("createdAt");
        } else if (entity.name.includes("ContractErrors")) {
            console.log('interfaceData.sourceSystem')
            entityData = await SELECT.from(entity)
                .columns('*', 'interfaceData.sourceSystem')
                .where({
                    terminalNo: keys.terminalNo,
                    folioMo: keys.folioMo
                })
                .orderBy `createdAt`
                // .orderBy({ createdAt: 'asc' });
                
        } else {
            req.error(buildErrorMessages.buildErrorWithMsg("Unknown entity for reprocessing."));
        }

        return entityData;
    }








    // const cds= require('@sap/cds');

    // module.exports =onReprocessFormUi

    // async function onReprocessFormUi(req) {
    //     const {data}=req.data;
    //     const listOfEntityObject=cds.entities("app.dan");
    //     const entityName=listOfEntityObject[data.entityName]
    //     return true
    // }
