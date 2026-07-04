const express = require("express")
const router = express.Router();


const {createProduct, getProduct, updateProduct, deleteProduct} = require("./product.controller")


router.post("/product", createProduct);
router.get("/", getProduct)
router.put("/updateproduct/:id", updateProduct)
router.patch("/deleteproduct/:id", deleteProduct)

module.exports = router