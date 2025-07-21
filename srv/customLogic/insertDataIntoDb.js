module.exports=onInsertDataIntoDb

async function onInsertDataIntoDb(req) {
    

        try {
            const newInsertdb = req.data.data;
            const tx = cds.transaction(req);
            const result = await tx.run(INSERT.into('DB_CHECK').entries(newInsertdb));
            // await INSERT.into(Check).entries({
            //     checkName,
            //     checkStatus,
            //     checkBy
            // });
           return result;
            // return "Check inserted successfully.";
        } catch (err) {
            console.error("Insert failed:", err);
            req.error(500, "Insert failed.");
        }
    
}