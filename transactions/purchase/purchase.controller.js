const purchaseModel = require("./purchase.model")

const createPurchaseOrder = (req, res)=>{
    const purchaseData = {header: req.body.createPurchaseHeader,
                          detail: req.body.createPurchaseDetail
                         }

        purchaseModel.createPurchase(purchaseData, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: err.message
                })
            }else{
                res.status(200).json({
                    message:"Purchase order created success",
                    purchaseId:result.purchaseId,
                    ponumber: result.ponumber
                })
            }
        })

        console.log("Request Body:");
    console.log(req.body);

    console.log("Purchase Data:");
    console.log(purchaseData);
}

module.exports = {
    createPurchaseOrder
}

