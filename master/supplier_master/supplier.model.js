const db = require("../../db_config/db.js")

const getAllSuppliers = (callback) =>{
    const query = "SELECT * FROM supplier"
    db.query(query, callback)
}

const addSupplier = (supplierData, callback)=>{
    const query = "INSERT INTO supplier(name, mobile, email, gst, person, address, status) VALUES(?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [supplierData.name, 
                   supplierData.mobile, 
                   supplierData.email, 
                   supplierData.gst, 
                   supplierData.person, 
                   supplierData.address,
                   supplierData.status
                ], callback)
}

const updateSupplier = (id, supplierData, callback)=>{
    const query = `UPDATE supplier 
                    SET name = ?,
                        mobile = ?,
                        email = ?,
                        gst = ?,
                        person = ?,
                        address = ?
                    WHERE id = ?
                    `;
            db.query(query, [
                supplierData.name,
                supplierData.mobile,
                supplierData.email,
                supplierData.gst,
                supplierData.person,
                supplierData.address,
                id
            ], callback)
}

const deleteSupplier = (id, callback) =>{
    const query =  `DELETE FROM supplier WHERE id = ?`

    db.query(query, [id], callback)
}

const inactiveSupplier = (id, callback)=>{
    const query = `UPDATE supplier SET status = "Inactive" WHERE id = ?`

    db.query(query, [id], callback)
}

module.exports = {
    getAllSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    inactiveSupplier
}