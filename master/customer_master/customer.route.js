const express = require("express")
const router = express.Router()

const {createCustomer, getCustomer} = require("./customer.controller")


router.post("/customer", createCustomer)
router.get("/", getCustomer)

module.exports = router;


