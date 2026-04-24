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
		<div style={pageStyle}>
			<div style={formCard}>
				<h2 style={titleStyle}>Login</h2>
				<div style={redLine}></div>

				<p style={subtitleStyle}>
					Access your Posadas CF Store account.
				</p>

				<form onSubmit={handleSubmit}>
					<label style={labelStyle}>Email</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						style={inputStyle}
					/>

					<label style={labelStyle}>Password</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						style={inputStyle}
					/>

					{error && <p style={errorStyle}>{error}</p>}

					<button type="submit" disabled={loading} style={mainButton}>
						{loading ? "Loading..." : "Login"}
					</button>
				</form>

				<p style={footerText}>
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
};

const pageStyle = {
	minHeight: "calc(100vh - 80px)",
	backgroundColor: "#f3f6fb",
	display: "flex",
	justifyContent: "center",
	alignItems: "flex-start",
	paddingTop: "60px",
};

const formCard = {
	backgroundColor: "white",
	width: "100%",
	maxWidth: "430px",
	padding: "35px",
	borderRadius: "8px",
	boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
};

const titleStyle = {
	color: "#0f2f78",
	marginBottom: "8px",
};

const redLine = {
	width: "55px",
	height: "3px",
	backgroundColor: "#d61f26",
	marginBottom: "20px",
};

const subtitleStyle = {
	marginBottom: "25px",
	color: "#333",
};

const labelStyle = {
	display: "block",
	marginBottom: "6px",
	fontWeight: "bold",
};

const inputStyle = {
	width: "100%",
	padding: "10px",
	marginBottom: "16px",
	border: "1px solid #bbb",
	borderRadius: "4px",
	boxSizing: "border-box",
};

const mainButton = {
	width: "100%",
	padding: "12px",
	backgroundColor: "#d61f26",
	color: "white",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
	fontWeight: "bold",
};

const errorStyle = {
	color: "#d61f26",
	marginBottom: "12px",
};

const footerText = {
	marginTop: "18px",
	textAlign: "center",
};

export default Login;