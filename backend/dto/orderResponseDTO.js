const orderResponseDTO = (order) => {
	return {
		id: order.id,
		userId: order.userId,
		totalAmount: Number(order.totalAmount),
		status: order.status,
		createdAt: order.createdAt,
	};
};

module.exports = orderResponseDTO;