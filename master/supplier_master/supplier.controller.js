const supplierModel = require("./supplier.model")

const getSupplier = (req, res)=>{
    supplierModel.getAllSuppliers((err, result)=>{
        if(err){
            return res.status(500).json(err)
        }else{
            res.json(result)
        }
    })
}

const createSupplier = (req, res)=>{
    supplierModel.addSupplier(req.body, (err, result)=>{
        if(err){
            return res.status(500).json(err)
        }else{
            res.json({
                message: "Supplier added successfully",
                id: result.insertId
            })
        }
    })
}

const updateSupplier = ((req, res)=>{
    supplierModel.updateSupplier(req.params.id, req.body, (err, result)=>{
        if(err){
            return res.status(500).json(err)
        }else{
            res.json({
                message: "Supplier Updated Successfully",
                id: result.id
            })
        }
    })
})

const deleteSupplier = (req, res)=>{
    supplierModel.deleteSupplier(req.params.id, (err, result)=>{
        if(err){
            return res.status(500).json(err)
        }else{
            res.json({
                message: "Supplier Deleted Successfully",
                id: result.id
            })
        }
    })
}

const inactiveSupplier = (req, res)=>{
    supplierModel.inactiveSupplier(req.params.id, (err, result)=>{
        if(err){
            return res.status(500).json(err)
        }else{
            res.json({
                message: "Supplier Deleted Successfully",
                affectedRows: result.affectedRows
            })
        }
    })
}

module.exports = {
    getSupplier, createSupplier, updateSupplier, deleteSupplier, inactiveSupplier
}