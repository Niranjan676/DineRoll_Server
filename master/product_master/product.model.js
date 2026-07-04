const db = require("../../db_config/db.js")
const { get } = require("./product.route.js")

const addProduct = (productData, callback)=>{
    const query = `INSERT INTO mst_product(productCode, productName, productCategory, productType, productMaterial, gsm, weight, length, unit, hsnCode, status)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        db.query(query, [
                            productData.productCode,
                            productData.productName,
                            productData.productCategory,
                            productData.productType,
                            productData.productMaterial, 
                            productData.gsm, 
                            productData.weight, 
                            productData.length, 
                            productData.unit, 
                            productData.hsnCode, 
                            productData.status 
                        ],
                    callback)
}

const getProduct = (callback)=>{
    const query = `SELECT * FROM mst_product`

    db.query(query, callback)
}

const updateProduct = (id, productData, callback)=>{
    const query = `UPDATE mst_product
                        SET productCode = ?, 
                            productName = ?, 
                            productCategory = ?, 
                            productType = ?,
                            productMaterial = ?,
                            gsm = ?, 
                            weight = ?, 
                            length = ?, 
                            unit = ?,
                            hsnCode = ?
                        WHERE id = ?`
    db.query(query, [
                            productData.productCode,
                            productData.productName,
                            productData.productCategory,
                            productData.productType,
                            productData.productMaterial, 
                            productData.gsm, 
                            productData.weight, 
                            productData.length, 
                            productData.unit, 
                            productData.hsnCode,
                            id
                        ], 
                    callback)
}

const deleteProduct = (id, callback) =>{
    const query =  `UPDATE mst_product 
                        SET status = "Inactive"
                        WHERE id = ?`
    db.query(query, [id], callback)
}



module.exports = {
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}