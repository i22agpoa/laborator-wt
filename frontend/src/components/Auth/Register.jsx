import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
	const { register, error } = useContext(AuthContext);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
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
			await register(formData);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "40px auto" }}>
			<h2>Register</h2>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
					/>
				</div>

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

				{error && <p style={{ color: "red" }}>{error}</p>}

				<button type="submit" disabled={loading} style={{ padding: "10px 15px" }}>
					{loading ? "Loading..." : "Register"}
				</button>
			</form>

			<p style={{ marginTop: "15px" }}>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
};

export default Register;