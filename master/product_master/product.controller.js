const productModel = require("./product.model")

const createProduct = (req, res)=>{
    productModel.addProduct(req.body, (err, result) => {
    if (err) {
        if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json({
                message: "Product code alredy exist"
            })
        }
        if(err.code === "ECONNREFUSED"){
            return res.status(503).json({
                message: "Database service is unavailable."
            })
        }
    }
    return res.status(201).json({
            message: "Product added success",
            id:result.insertId
        })
})
}

const getProduct = (req, res)=>{
    productModel.getProduct((err, result)=>{
        if(err){
            res.status(500).json({
                message: err.message
            })
        }else{
                res.status(200).json({
                    message: "Product fetched success",
                    data: result 
                })
            }
    })
}

const updateProduct = (req, res)=>{
    productModel.updateProduct(req.params.id, req.body, (err, result)=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
            return res.status(409).json({
                message: "Product code alredy exist"
            })
        }
        if(err.code === "ECONNREFUSED"){
            return res.status(503).json({
                message: "Database service is unavailable."
            })
        }
        }else{
            res.status(200).json({
                message: "Product updated successfully",
                id: result.id
            })
        }
    })
}

const deleteProduct = (req, res)=>{
    productModel.deleteProduct(req.params.id, (err, result)=>{
        if(err){
            return res.status(500).json({
                message: "Internal server error"
            })
        }else{
            res.status(200).json({
                message: "Product deleted success",
                id:result.id
            }
            )
        }
    })
}
module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
