const express = require("express");

const router = express.Router();

const {addMaterial, getMaterial, updateMaterial} = require("./material.controller")

router.post("/material", addMaterial)
router.get("/", getMaterial)
router.put("/material/:id", updateMaterial)

module.exports = router;