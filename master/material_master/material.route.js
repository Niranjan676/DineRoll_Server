const express = require("express");

const router = express.Router();

const {addMaterial, getMaterial, updateMaterial, InactiveMaterial} = require("./material.controller")

router.post("/material", addMaterial)
router.get("/", getMaterial)
router.put("/material/:id", updateMaterial)
router.patch("/material/:id/inactive", InactiveMaterial)

module.exports = router;