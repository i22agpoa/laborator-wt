const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// PUBLIC

// Get all products
router.get("/", productController.getAllProducts);

// Get one product by ID
router.get("/:id", productController.getProductById);

// ADMIN ONLY

// Create product
router.post("/", 
    authenticate,
    authorize("admin"), 
    productController.createProduct
);

// Update product
router.put("/:id",
    authenticate,
    authorize("admin"),
    productController.updateProduct
);

// Delete product
router.delete("/:id",
    authenticate,
    authorize("admin"),
    productController.deleteProduct
);

module.exports = router;