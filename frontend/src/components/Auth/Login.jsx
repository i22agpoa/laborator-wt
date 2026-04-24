import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
	const { login, error } = useContext(AuthContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await login(formData);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "40px auto" }}>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
					/>
				</div>

				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
					/>
				</div>

				{error && (
					<p style={{ color: "red" }}>
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={loading}
					style={{ padding: "10px 15px" }}
				>
					{loading ? "Loading..." : "Login"}
				</button>
			</form>

			<p style={{ marginTop: "15px" }}>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
};

export default Login;