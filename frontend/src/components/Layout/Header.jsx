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
		<header
			style={{
				backgroundColor: "#0f2f78",
				padding: "18px 40px",
				color: "white",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<h2 style={{ margin: 0 }}>
				<Link
					to="/"
					style={{
						color: "white",
						textDecoration: "none",
					}}
				>
					Posadas CF Store
				</Link>
			</h2>

			<nav style={{ display: "flex", gap: "18px", alignItems: "center" }}>
				<Link style={linkStyle} to="/">Home</Link>
				<Link style={linkStyle} to="/dashboard">Dashboard</Link>
				<Link style={linkStyle} to="/products">Products</Link>
				<Link style={linkStyle} to="/orders">Orders</Link>

				{isAuthenticated ? (
					<>
						<span>{user?.username}</span>
						<button onClick={handleLogout}>Logout</button>
					</>
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

const linkStyle = {
	color: "white",
	textDecoration: "none",
};

export default Header;