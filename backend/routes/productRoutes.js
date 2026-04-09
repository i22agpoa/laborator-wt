const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by ID
router.get("/", productController.getProductById);

// Create product
router.post("/", productController.createProduct);

// Update product
router.put("/", productController.updateProduct);

// Delete product
router.delete("/", productController.deleteProduct);

module.exports = router;