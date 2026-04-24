import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:5002/api",
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * TODO: Configurați instanța Axios pentru a gestiona cererile HTTP către API.
 * Acest fișier ar trebui să includă:
 * 1. Adăugarea unui interceptor pentru cereri, care:
 *    - Preia token-ul de autentificare din localStorage.
 *    - Adaugă token-ul în header-ul `Authorization`, dacă acesta există.
 * 2. Adăugarea unui interceptor pentru răspunsuri, care:
 *    - Gestionază erorile de autentificare (ex: dacă token-ul a expirat, utilizatorul este redirecționat către login).
 */

// Add token automatically to requests
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle authentication errors
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
		}

		return Promise.reject(error);
	}
);

export default instance;
