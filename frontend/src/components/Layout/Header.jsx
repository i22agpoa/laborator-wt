import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
	const { user, isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<header style={headerStyle}>
			<h2 style={{ margin: 0 }}>
				<Link to="/" style={brandStyle}>
					Posadas CF Store
				</Link>
			</h2>

			<nav style={navStyle}>
				<Link style={linkStyle} to="/">Home</Link>
				<Link style={linkStyle} to="/dashboard">Dashboard</Link>
				<Link style={linkStyle} to="/products">Products</Link>
				<Link style={linkStyle} to="/orders">Orders</Link>

				{isAuthenticated ? (
					<div style={accountArea}>
						<span style={userStyle}>👤 {user?.username}</span>

						<button onClick={handleLogout} style={logoutStyle}>
							Logout
						</button>
					</div>
				) : (
					<>
						<Link style={linkStyle} to="/login">Login</Link>
						<Link style={linkStyle} to="/register">Register</Link>
					</>
				)}
			</nav>
		</header>
	);
};

const headerStyle = {
	backgroundColor: "#0f2f78",
	padding: "18px 40px",
	color: "white",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
};

const brandStyle = {
	color: "white",
	textDecoration: "none",
};

const navStyle = {
	display: "flex",
	gap: "18px",
	alignItems: "center",
};

const accountArea = {
	display: "flex",
	alignItems: "center",
	gap: "14px",
	marginLeft: "18px",
	paddingLeft: "18px",
	borderLeft: "1px solid rgba(255,255,255,0.35)",
};

const linkStyle = {
	color: "white",
	textDecoration: "none",
};

const userStyle = {
	color: "#dbe6ff",
	fontWeight: "normal",
	fontSize: "15px",
};

const logoutStyle = {
	background: "none",
	border: "none",
	color: "white",
	cursor: "pointer",
	fontSize: "15px",
	padding: 0,
};

export default Header;