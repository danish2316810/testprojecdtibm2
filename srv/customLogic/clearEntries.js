const cds = require('@sap/cds');

module.exports = {
  onClearEntries
};

async function onClearEntries(req) {
    console.log("hi danish job is triggered")
  const tx = cds.tx(req); // start a transaction
  try {
    const entities = cds.entities("app.dan");
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 0);

    const deleteErrorEntriesFrom = ["ContractErrors", "NominationErrors"];
    const rError = await deleteErrorTableEntries(deleteErrorEntriesFrom, entities, pastDate, tx);

    await tx.commit();   // commit if all good
    return rError;
  } catch (err) {
    await tx.rollback(); // rollback if anything failed
    return { errorMsg: err.message };
  }
}

async function deleteErrorTableEntries(deleteErrorEntriesFrom, entities, pastDate, tx) {
  for (const deleteFrom of deleteErrorEntriesFrom) {
    console.log(deleteFrom);

    const rErrorResult = await tx.run(
      SELECT.from(entities[deleteFrom]).where`createdAt < ${pastDate.toISOString()}`
    );

    if (rErrorResult?.length > 0) {
      const aInterfaceData = rErrorResult.map(r => r.interfaceUUID);

      // Step 1: delete from child (InterfaceData)
      const rInterfaceDataDelete = await tx.run(
        DELETE.from(entities.InterfaceData).where`ID in ${aInterfaceData}`
      );

      if (rInterfaceDataDelete > 0) {
        // Step 2: delete from parent
        await tx.run(
          DELETE.from(entities[deleteFrom]).where`createdAt < ${pastDate.toISOString()}`
        );
      } else {
        throw new Error("InterfaceData deletion failed. Stopping process.");
      }
    }
  }
  return { errorMsg: "" };
}

// async function onClearEntries(req) {
//     const entities=cds.entities("app.dan");
//     const pastDate=new Date();
//     pastDate.setDate(pastDate.getDate()-10)
//     const deleteErrorEntriesFrom=["ContractErrors", "NominationErrors"]
//     const rError=await deleteErrorTableEntries(deleteErrorEntriesFrom, entities,pastDate)
// }

// async function deleteErrorTableEntries(deleteErrorEntriesFrom,entities,pastDate) {
//     const rReturn={
//         "errorMsg": ''
//     }
//     for(const deleteFrom of deleteErrorEntriesFrom){
//         console.log(deleteFrom)
//         const rErrorResult= await SELECT.from(entities[deleteFrom])
//                                         . where `createdAt<${pastDate.toISOString()}`;
//         if(rErrorResult?.length>0){
//             const aInterfaceData=[];
//             for (const errroRecord of rErrorResult){
//                 aInterfaceData.push(errroRecord.interfaceUUID)
//             }
//             const rInterfaceDataDelete= await DELETE.from(entities["InterfaceData"])
//                                                 .where `ID in ${aInterfaceData}`
//         }
        
//     }
// }