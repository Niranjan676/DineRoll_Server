const express = require("express")
const router = express.Router()

const {createCustomer, getCustomer, updateCustomer, inactiveCustomer} = require("./customer.controller")


router.post("/customer", createCustomer)
router.get("/", getCustomer)
router.put("/updatecustomer/:id", updateCustomer)
router.patch("/customer/:id/inactive", inactiveCustomer)

module.exports = router;


