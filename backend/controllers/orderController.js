const { or } = require("sequelize");
const { Order } = require("../models");

// Get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Get order by ID
const getOrderById = async(req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(400).json({ message: "Order not found", });
        }

        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

// Create a new order
const createOrder = async(req, res, next) => {
    try {
        const { userId, totalAmount, status } = req.body;

        if (!userId || totalAmount === undefined) {
            return res.status(400).json({ message: "userId and totalAmount are required", });
        }

        const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

        const order = await Order.create({
            userId,
            totalAmount,
            status,
        });

        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        next(error);
    }
};

// Update order
const updateOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId, totalAmount, status } = req.body;

		const order = await Order.findByPk(id);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

        if (userId) {
			const user = await User.findByPk(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
		}

		await order.update({
			userId: userId ?? order.userId,
            totalAmount: totalAmount ?? order.totalAmount,
            status: status ?? order.status,
		});

		res.status(200).json({
			message: "Order updated successfully",
			order,
		});
	} catch (error) {
		next(error);
	}
};

// Delete order
const deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params;

		const order = await Order.findByPk(id);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		await order.destroy();

		res.status(200).json({
			message: "Order deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};