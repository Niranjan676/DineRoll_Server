const db = require("../../db_config/db.js")


const createCustomer = (customerData, callback)=>{
    const query = `INSERT INTO mst_customer(name, phone, gst, address, status)
                        VALUES(?, ?, ?, ?, ?)`
    db.query(query, 
                [customerData.name, 
                 customerData.phone,
                 customerData.gst,
                 customerData.address, 
                 customerData.status],
                callback)
}

const getCustomer = (callback)=>{
    const query = `SELECT * FROM mst_customer`

    db.query(query,callback)
}

const updateCustomer = (id, customerData, callback) =>{
    const query = `UPDATE mst_customer
                        SET name = ?,
                            phone = ?, 
                            gst = ?,
                            address =?,
                            status = ?
                        WHERE id = ?`
    db.query(query, [
                        customerData.name,
                        customerData.phone,
                        customerData.gst,
                        customerData.address,
                        customerData.status,
                        id
                    ], callback)
}

const inactiveCustomer = (id, customerData, callback)=>{
    const query = `UPDATE mst_customer
                            SET status = "Inactive"
                            WHERE id = ?`

        db.query(query, [id], callback)
}

module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer,
    inactiveCustomer
}