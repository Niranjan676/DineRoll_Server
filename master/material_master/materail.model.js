const db = require("../../db_config/db.js");

const addMaterail = (materailData, callback) =>{
    const query = "INSERT INTO mst_material(code, name, gsm, unit, status) VALUES(?, ?, ?, ?, ?)";

    db.query(query, [materailData.code,
                     materailData.name,
                     materailData.gsm === "" ? null : Number(materailData.gsm),
                     materailData.unit,
                     materailData.status],
                     callback
                    )
}

const getMaterial = (callback) =>{
    const query = "SELECT * FROM mst_material"

    db.query(query, callback)
}

const editMaterial = (id, materialData, callback)=>{
    const query = `UPDATE mst_material
                     SET code = ?,
                         name = ?,
                         gsm = ?, 
                         unit = ?,
                         status = ?
                     WHERE id = ?`
    db.query(query, [
                        materialData.code,
                        materialData.name,
                        materialData.gsm === "" ? null : Number(materialData.gsm),
                        materialData.unit,
                        materialData.status,
                        id
                    ], callback)
}

const deleteMaterial = (id, materailData, callback)=>{
    const query = `UPDATE mst_material 
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