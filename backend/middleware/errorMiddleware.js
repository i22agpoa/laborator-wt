/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorMiddleware = (err, req, res, next) => {
	/**
	 * TODO: Implementați middleware-ul de gestionare a erorilor.
	 * Acest middleware ar trebui să:
	 * 1. Înregistreze eroarea în consola serverului pentru depanare.
	 * 2. Determine codul de stare HTTP corespunzător (implicit 500 - Eroare Internă a Serverului).
	 * 3. Returneze un mesaj de eroare adecvat utilizatorului.
	 * 4. În mediul de producție, să ascundă stack trace-ul pentru securitate.
	 */

	console.error(err);

	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		message: err.message || "Internal Server Error",
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

module.exports = errorMiddleware;
