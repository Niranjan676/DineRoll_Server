const customerModel = require("./customer.model")

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

const updateCustomer = (req, res)=>{
    customerModel.updateCustomer(req.params.id, req.body, (err, result)=>{
        if(err){
            res.status(200).json({
                message: err.message
            })
        }else{
            res.status(201).json({
                message: "Customer updated Success",
                affectedRows: result.affectedRows
            })
        }
    })
}

const inactiveCustomer = (req, res)=>{
    customerModel.inactiveCustomer(req.params.id, req.body, (err, result)=>{
        if(err){
            res.status(500).json({
                message: message.err
            })
        }else{
            res.status(200).json({
                message: "Customer deleted success",
                id: result.insertId
            })
        }
    })
}

module.exports = {
    createCustomer, getCustomer, updateCustomer, inactiveCustomer
}