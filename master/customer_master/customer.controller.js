const customerModel = require("./customer.model")
const { get } = require("./customer.route")

const createCustomer = (req, res)=>{
    customerModel.createCustomer(req.body, (err, result)=>{
        if(err){
            return res.status(500).json({
                message: err.message
            })
        }else{
            res.status(201).json({
                message: "Customer created success",
                id: result.insertId
            })
        }
    })
}

const getCustomer = (req, res)=>{
    customerModel.getCustomer((err, result)=>{
        if(err){
            res.status(500).json({
                message: err.message
            })
        }else{
            res.status(200).json({
                message: "Customer fetched successfully",
                data: result
            })
        }
    })
}

module.exports = {
    createCustomer, getCustomer
}