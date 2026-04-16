const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Posadas CF Store API",
			version: "1.0.0",
			description: "API documentation for the Posadas CF merchandise store project",
		},
		servers: [
			{
				url: "http://localhost:5002",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;