const db = require("../../db_config/db.js")


const createOrder = (purchaseOrderData, callback)=>{
    db.beginTransaction((err)=>{
        if(err){
            return db.rollback(()=>{
            return callback(err)
        })
        }

        const currentYear = new Date().getFullYear()

        //Getting PO Number from trs_purchaseheader
        const getPoNumber = `SELECT ponumber FROM trs_purchaseheader
                                ORDER BY id DESC
                                LIMIT 1`

            db.query(getPoNumber, (err, result)=>{
                if(err){
                   return db.rollback(()=>{
                        return callback(err)
                    })
                }
            console.log(result)

            let poNumber
                
            if(result.length === 0){
                poNumber = `PO/${currentYear}/0001`
                console.log(poNumber)
            }else{
                const lastPoNumber = result[0].ponumber
                const parts = lastPoNumber.split("/") 
                const lastYear = Number(parts[1])
                const lastNumber = Number(parts[2])

                if(lastYear !==currentYear){
                    poNumber =`PO/${currentYear}/0001`
                }else {
                    const nextPoNumber = lastNumber + 1
                    poNumber = `PO/${currentYear}/${String(nextPoNumber).padStart(4, "0")}`
                }
            }
            console.log(poNumber)

        if(purchaseOrderData.detail.length === 0){
            return db.rollback(()=>{
                 return callback(new Error("Purchase order must contain at least one item"))
            })
        }
        // creating purchase header data
        const headerQuery = `INSERT INTO trs_purchaseheader (
                                ponumber, 
                                podate, 
                                suppliername, 
                                contactperson, 
                                phone, 
                                paymentmode,
                                remarks)
                            VALUES(?, ?, ?, ?, ?, ?, ?)`
                db.query(headerQuery, [poNumber, 
                                    purchaseOrderData.header.podate, 
                                    purchaseOrderData.header.suppliername, 
                                    purchaseOrderData.header.contactperson, 
                                    purchaseOrderData.header.phone, 
                                    purchaseOrderData.header.paymentmode,
                                    purchaseOrderData.header.remarks
                                ], 
                                    (err, headerId)=>{
                            if(err){
                                return db.rollback(()=>{
                                    return callback(err)
                                })
                            }
                            console.log("Purchase header saved success")
                            const headerId = headerResult.insertId

        // Once header data is saved item detail has to inserted based on that header id
        let completed = 0

        purchaseOrderData.detail.forEach((element)=>{
                const detailQuery = `INSERT INTO trs_purchasedetail (
                                        purchaseheader_id,
                                        itemcode,
                                        itemname,
                                        gsm,
                                        quantity,
                                        unit,
                                        rate,
                                        amount)
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

                db.query(detailQuery, [
                                    headerId,
                                    element.itemcode,
                                    element.itemname,
                                    element.gsm,
                                    element.quantity,
                                    element.unit,
                                    element.rate,
                                    element.amount
                                ], (err)=>{
                                    if(err){
                                        return db.rollback(()=>{
                                            return callback(err)
                                        })
                                    }
                                console.log("Purchase detail saved success")
                                completed ++
                if(completed === purchaseOrderData.detail.length){
                    db.commit((err)=>{
                        if(err){
                            return db.rollback(()=>{
                                return callback(err)
                            })
                        }
                    callback(null, {
                                message: "Purchase order created success",
                                poNumber,
                                headerId
                            })
                    }) 
                }
            })
            
        });                 
    })
  })
})
}