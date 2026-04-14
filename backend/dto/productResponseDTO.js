const productResponseDTO = (product) => {
	return {
		id: product.id,
		name: product.name,
		description: product.description,
		price: Number(product.price),
		stock: product.stock,
		imageUrl: product.imageUrl,
	};
};

module.exports = productResponseDTO;