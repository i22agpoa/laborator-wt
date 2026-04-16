const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { sequelize } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base route
app.get("/", (req, res) => {
	res.json({ message: "Welcome!" });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const startServer = async () => {
	try {
		// Sync database
		await sequelize.sync({ alter: true });
		console.log("Database connected successfully");

		// Start server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		process.exit(1);
	}
};

startServer();
