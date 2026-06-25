const express = require("express");
const cors = require("cors")
require("dotenv").config()

const app = express()

require("./db_config/db.js")

const supplierMaster =  require("./master/supplier_master/supplier.routes.js")
const materialMaster = require("./master/material_master/material.route.js")
const customerMaster = require("./master/customer_master/customer.route.js")

app.use(cors())
app.use(express.json())


app.use("/suppliers", supplierMaster)
app.use("/material", materialMaster)
app.use("/customer", customerMaster)

app.listen(8000, ()=>{
    console.log(`Server running on the port 8000`)
})