const userResponseDTO = (user) => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		role: user.role,
		isActive: user.isActive,
	};
};

module.exports = userResponseDTO;