const authService = require("../services/authService");

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const register = async (req, res, next) => {
	/**
	 * TODO:  Implementați funcția de inregistrare (register).
	 * Această funcție ar trebui să:
	 * 1. Primească datele utilizatorului (username, email și parolă).
	 * 2. Valideze câmpurile de intrare pentru a preveni erorile.
	 * 3. Creeze un utilizator nou folosind serviciul authService.
	 * 4. Returneze un răspuns corespunzător (de exemplu, un mesaj de succes sau un JWT token dacă este necesar).
	 */

	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "Username, email and password are required",
			});
		}

		const user = await authService.registerUser({
			username,
			email,
			password,
		});

		res.status(201).json({
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const login = async (req, res, next) => {
	/**
	 * TODO: Implementați funcția de autentificare (login).
	 * Această funcție ar trebui să:
	 * 1. Primească datele de autentificare ale utilizatorului (email & parolă).
	 * 2. Valideze câmpurile de intrare pentru a preveni erorile.
	 * 3. Autentifice utilizatorul folosind serviciul authService.
	 * 4. Returneze un răspuns corespunzător (ex. token JWT în cazul unui succes).
	 */

	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Email and password are required",
			});
		}

		const result = await authService.loginUser({
			email,
			password,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getProfile = async (req, res, next) => {
	/**
	 * TODO: Implementare funcția de getProfile.
	 * Această funcție ar trebui să:
	 * 1. Preia informațiile utilizatorului autentificat.
	 * 2. Returneze detaliile profilului acestuia.
	 * 3. Să fie protejată printr-un middleware de autentificare pentru a permite doar utilizatorilor autentificați accesul.
	 */
};

module.exports = {
	register,
	login,
	getProfile,
};
