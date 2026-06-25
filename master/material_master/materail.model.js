const db = require("../../db_config/db.js");

const addMaterail = (materailData, callback) =>{
    const query = "INSERT INTO material(name, gsm, unit) VALUES(?, ?, ?)";

    db.query(query, [materailData.name,
                     materailData.gsm === "" ? null : materailData.gsm,
                     materailData.unit],
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
                         unit = ?
                     WHERE id = ?`
    db.query(query, [
                        materialData.name,
                        materialData.gsm === "" ? null : Number(materialData.gsm),
                        materialData.unit,
                        id
                    ], callback)
}

module.exports = {
    addMaterail,
    getMaterial, 
    editMaterial
}