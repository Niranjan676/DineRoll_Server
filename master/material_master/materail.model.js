const db = require("../../db_config/db.js");

const addMaterail = (materailData, callback) =>{
    const query = "INSERT INTO material(name, gsm, unit, status) VALUES(?, ?, ?, ?)";

    db.query(query, [materailData.name,
                     materailData.gsm === "" ? null : materailData.gsm,
                     materailData.unit,
                     materailData.status],
                     callback
                    )
}

const getMaterial = (callback) =>{
    const query = "SELECT * FROM material"

    db.query(query, callback)
}

const editMaterial = (id, materialData, callback)=>{
    const query = `UPDATE material
                     SET name = ?,
                         gsm = ?, 
                         unit = ?,
                         status = ?
                     WHERE id = ?`
    db.query(query, [
                        materialData.name,
                        materialData.gsm === "" ? null : Number(materialData.gsm),
                        materialData.unit,
                        materialData.status,
                        id
                    ], callback)
}

const deleteMaterial = (id, materailData, callback)=>{
    const query = `UPDATE material 
                    SET status = "Inactive"
                    WHERE id = ?`
        db.query(query, [id], callback)
}

module.exports = {
    addMaterail,
    getMaterial, 
    editMaterial,
    deleteMaterial
}