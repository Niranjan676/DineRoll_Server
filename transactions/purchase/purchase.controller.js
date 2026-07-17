const purchaseModel = require("./purchase.model")

const createPurchaseOrder = (req, res)=>{

        purchaseModel.createOrder(req.body, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                res.status(200).json({
                    message:"Purchase order created success",
                    data: result
                })
            }
        })

        console.log("Request Body:");
    console.log(req.body);
}

const getPoNumber = (req, res)=>{
    purchaseModel.getPoNumber((err, result)=>{
        if(err){
            res.status(500).json({
                message: "Internal server error",
                err: err.message
            })
        }else{
                res.status(200).json({
                    message: "Po Number fetched success",
                    poNumber: result
                })
            }
    })
}

module.exports = {
    createPurchaseOrder,
    getPoNumber
}

