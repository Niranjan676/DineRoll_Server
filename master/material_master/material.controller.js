const { raw } = require("mysql2");
const rawMaterial = require("./materail.model");

const addMaterial = (req, res)=>{
    rawMaterial.addMaterail(req.body, (err, result)=>{
        if(err){
            console.log("Error", err)
            return res.status(500).json(err)
        }
        else {
            res.json({
                message: "Materail added successfully",
                id: result.insertId
            })
        }
    })
}

const getMaterial = (req, res)=>{
    rawMaterial.getMaterial((err, result)=>{
        if(err){
            console.log("Error: ", err)
            return res.status(500).json(err)
        }else{
            res.status(200).json(result)
        }
    })
}

const updateMaterial = (req, res)=>{
    rawMaterial.editMaterial(req.params.id, req.body, (err, result)=>{
        if(err){
            console.log("Error", err)
            return res.status(500).json(err)
        }else{
            res.json({
                message: "Material updated success",
                id: result.id
            })
        }
    })
}

module.exports = {
    addMaterial,
    getMaterial,
    updateMaterial
}