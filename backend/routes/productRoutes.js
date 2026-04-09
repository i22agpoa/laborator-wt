const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by ID
router.get("/", productController.getProductById);

// Create product
router.get("/", productController.createProduct);

// Update product
router.get("/", productController.updateProduct);

// Delete product
router.get("/", productController.deleteProduct);

module.exports = router;