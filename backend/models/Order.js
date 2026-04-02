const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);

module.exports = Order;