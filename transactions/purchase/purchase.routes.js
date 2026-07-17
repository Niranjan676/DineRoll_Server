const express = require('express')

const router = express.Router()

const {createPurchaseOrder, getPoNumber} = require("./purchase.controller")

router.post("/purchaseorder", createPurchaseOrder)
router.get("/purchaseorder/next-ponumber", getPoNumber)

module.exports = router;