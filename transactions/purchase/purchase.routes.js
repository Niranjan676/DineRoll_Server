const express = require('express')

const router = express.Router()

const {createPurchaseOrder, getPoNumber, getPoOrderList, getSelectedOrderList, updatePo} = require("./purchase.controller")

router.post("/purchaseorder", createPurchaseOrder)
router.get("/purchaseorder/next-ponumber", getPoNumber)
router.get("/po-order-list", getPoOrderList)
router.get("/orderview/:id", getSelectedOrderList)
router.put("/updatedpo/:id", updatePo)

module.exports = router;