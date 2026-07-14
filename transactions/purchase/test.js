const db = require("../../db_config/db.js")

const testone = (testing, callback)=>{
    db.beginTransaction((err)=>{
        if(err){
            return callback(err)
        }
        const querytest = `INSERT INTO header (code, name)
                            VALUES(?, ?)`
        
        db.query(querytest, [testing.header.code, testing.header.name], (err, headerResult)=>{
            if(err){
                return db.rollback(()=>callback(err))
            }
            const testId = headerResult.insertId

            if (testing.detail.length === 0) {
                return db.rollback(() => callback(new Error("At least one detail record is required.")))
            }

            let completed = 0

            testing.detail.forEach(element => {
                const tabletesting = `INSERT INTO detail (testId,itemcode, itemname)
                                            VALUES(?, ?, ?)`

                db.query(tabletesting, [testId, element.itemcode, element.itemname], (err)=>{
                    if(err){
                        return db.rollback(()=>{
                            callback(err)
                        })
                    }
                completed ++
                if(completed === testing.detail.length){
                    db.commit((err)=>{
                        if(err){
                            return db.rollback(()=>callback(err))
                        }
                        return callback(null, {
                    message: "Success",
                    testId
                })
                    })
                }
                })
            });
        })

    })
}