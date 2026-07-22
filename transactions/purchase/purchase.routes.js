const express = require('express')

const router = express.Router()

const {createPurchaseOrder, getPoNumber, getPoOrderList} = require("./purchase.controller")

router.post("/purchaseorder", createPurchaseOrder)
router.get("/purchaseorder/next-ponumber", getPoNumber)
router.get("/po-order-list", getPoOrderList)

module.exports = router;