    const db = require('./db_config/db.js')

    const createOrder = (purchaseOrderData, callback)=>{
        db.beginTransaction((err)=>{
            if(err){
                return db.rollback(()=>{
                    return callback(err)
                })
            }
        console.log("Transaction begins")

        const currentYear = new Date().getFullYear()
        const number = 1

        const poNumber = `PO/${currentYear}/${String(number).padStart(4, "0")}`

        const poNumberQuery = `SELECT ponumber FROM trs_purchaseheader
                                    ORDER BY id DESC
                                    LIMIT 1`
            db.query(poNumberQuery, (err, result)=>{
                if(err){
                   return db.rollback(()=>{
                    callback(err)
                   })
                }
                console.log(result)
            })


        // creating purchase header data

        const headerQuery = `INSERT INTO trs_purchaseheader (
                                ponumber, 
                                podate, 
                                suppliername, 
                                contactperson, 
                                phone, 
                                paymentmode,
                                remarks,
                                status)
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
                db.query(headerQuery, [poNumber, 
                                    purchaseOrderData.header.podate, 
                                    purchaseOrderData.header.suppliername, 
                                    purchaseOrderData.header.contactperson, 
                                    purchaseOrderData.header.phone, 
                                    purchaseOrderData.header.paymentmode,
                                    purchaseOrderData.header.remarks,
                                    purchaseOrderData.header.status], 
                                    (err, header_result)=>{
                            if(err){
                                return db.rollback(()=>{
                                    return callback(err)
                                })
                            }
                            console.log("Purchase header saved success")
                            const headerId = header_result.insertId

        // Once header data is saved item detail has to inserted based on that header id

        if(purchaseOrderData.detail.length === 0){
            return db.rollback(()=>{
                 return callback(new Error("Purchase order must contain at least one item"))
            })
        }
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
                                headerId
                            })
                    }) 
        }
                                })
            
        });                 
                        })
        })
    }

    module.exports = {
        createOrder
    }