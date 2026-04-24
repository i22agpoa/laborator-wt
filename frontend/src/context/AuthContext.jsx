import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		/**
		 * TODO: Încărcarea utilizatorului la inițializarea aplicației.
		 * Această funcție ar trebui să:
		 * 1. Verifice dacă există un token salvat în localStorage.
		 * 2. Dacă există un token, să facă un request GET către "/auth/profile" pentru a obține datele utilizatorului.
		 * 3. Să actualizeze starea utilizatorului și a autentificării.
		 * 4. În caz de eroare, să elimine token-ul din localStorage și să reseteze starea autentificării.
		 */

		const loadUser = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				setIsLoading(false);
				return;
			}

			try {
				const response = await authService.getProfile();
				setUser(response.user);
				setIsAuthenticated(true);
			} catch (error) {
				localStorage.removeItem("token");
				setUser(null);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		loadUser();
	}, []);

	const register = async (userData) => {
		/**
		 * TODO: Implementați funcția de înregistrare a utilizatorului.
		 * Aceasta ar trebui să:
		 * 1. Trimită datele utilizatorului printr-un request POST către "/auth/register".
		 * 2. Să salveze token-ul primit în localStorage.
		 * 3. Să actualizeze starea utilizatorului și a autentificării.
		 * 4. Să returneze răspunsul serverului sau să gestioneze eventualele erori.
		 */

		try {
			setError(null);

			const response = await authService.register(userData);

			localStorage.setItem("token", response.token);
			setUser(response.user);
			setIsAuthenticated(true);

			return response;
		} catch (error) {
			const message =
				error.response?.data?.message || "Registration failed";

			setError(message);
			throw new Error(message);
		}
	};

	const login = async (credentials) => {
		/**
		 * TODO: Implementați funcția de autentificare a utilizatorului.
		 * Aceasta ar trebui să:
		 * 1. Trimită datele de autentificare printr-un request POST către "/auth/login".
		 * 2. Să salveze token-ul primit în localStorage.
		 * 3. Să actualizeze starea utilizatorului și a autentificării.
		 * 4. Să returneze răspunsul serverului sau să gestioneze eventualele erori.
		 */

		try {
			setError(null);

			const response = await authService.login(credentials);

			localStorage.setItem("token", response.token);
			setUser(response.user);
			setIsAuthenticated(true);

			return response;
		} catch (error) {
			const message = error.response?.data?.message || "Login failed";

			setError(message);
			throw new Error(message);
		}
	};

	const logout = () => {
		/**
		 * TODO: Implementați funcția de deconectare a utilizatorului.
		 * Aceasta ar trebui să:
		 * 1. Șteargă token-ul din localStorage.
		 * 2. Să reseteze starea utilizatorului și a autentificării.
		 * 3. Să returneze utilizatorul la pagina de login, dacă este necesar.
		 */

		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				error,
				register,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
