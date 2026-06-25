const express = require("express")

const router = express.Router()

const {getSupplier, createSupplier, updateSupplier, deleteSupplier, inactiveSupplier} = require("./supplier.controller")


router.get("/", getSupplier)
router.post("/supplier", createSupplier)
router.put("/supplier/:id", updateSupplier)
router.delete("/supplier/:id", deleteSupplier)
router.patch("/supplier/:id/inactive", inactiveSupplier)


module.exports = router;