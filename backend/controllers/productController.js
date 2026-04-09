const { Product } = require("../models");

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get product by ID
const getProductById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({ message: "Product not found", });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Create a new product
const createProduct = async(req, res, next) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        if (!name || price === undefined || stock === undefined) {
            return res.status(400).json({ message: "Name, price and stock are required", });
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        });

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        next(error);
    }
};

// Update product
const updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, description, price, stock, imageUrl } = req.body;

		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await product.update({
			name: name ?? product.name,
			description: description ?? product.description,
			price: price ?? product.price,
			stock: stock ?? product.stock,
			imageUrl: imageUrl ?? product.imageUrl,
		});

		res.status(200).json({
			message: "Product updated successfully",
			product,
		});
	} catch (error) {
		next(error);
	}
};

// Delete product
const deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;

		const product = await Product.findByPk(id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		await product.destroy();

		res.status(200).json({
			message: "Product deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};