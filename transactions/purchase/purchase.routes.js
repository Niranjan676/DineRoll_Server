const express = require('express')

const router = express.Router()

const {createPurchaseOrder} = require("./purchase.controller")

router.post("/purchaseorder", createPurchaseOrder)

module.exports = router;