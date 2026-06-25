const db = require("../../db_config/db.js")


const createCustomer = (customerData, callback)=>{
    const query = `INSERT INTO customer(name, phone, gst, address, status)
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
    const query = `SELECT * FROM customer`

    db.query(query,callback)
}

module.exports = {
    createCustomer,
    getCustomer
}