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

const getPoOrderList = (req, res)=>{
    purchaseModel.getPoOrderList((err, result)=>{
        if(err){
            res.status(500).json({
                message: err.message,
            })
        }else{
            res.status(200).json({
                message: "PO list fetched success",
                result
            })
        }
    })
}

const getSelectedOrderList = (req, res)=>{

    const id = req.params.id
    purchaseModel.getSelectedPoOrder(id, (err, result)=>{
        if(err){
            res.status(500).json({
                message: err.message
            })
        }else{
            res.status(200).json({
                message: "PO Order List Fetched Successfully",
                result: result
            })
        }
    })
}

const updatePo = (req, res) =>{
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    const id = req.params.id
    purchaseModel.updatePo(id, req.body, (err, result)=>{
        if(err){
            res.status(500).json({
                message: err.message
            })
        }else{
            res.status(200).json({
                message: "PO updated successfully",
                result
            })
        }
    })
}

module.exports = {
    createPurchaseOrder,
    getPoNumber,
    getPoOrderList,
    getSelectedOrderList,
    updatePo
}

