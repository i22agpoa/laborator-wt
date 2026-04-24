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
				padding: "15px 30px",
				backgroundColor: "#1f2937",
				color: "white",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<h2 style={{ margin: 0 }}>
				<Link to="/" style={{ color: "white", textDecoration: "none" }}>
					Posadas CF Store
				</Link>
			</h2>

			<nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
				<Link to="/" style={{ color: "white" }}>
					Home
				</Link>

				<Link to="/dashboard" style={{ color: "white" }}>
					Dashboard
				</Link>

				<Link to="/products" style={{ color: "white" }}>
					Products
				</Link>

				<Link to="/orders" style={{ color: "white" }}>
					Orders
				</Link>

				{isAuthenticated ? (
					<>
						<span>Hello, {user?.username}</span>
						<button onClick={handleLogout}>Logout</button>
					</>
				) : (
					<>
						<Link to="/login" style={{ color: "white" }}>
							Login
						</Link>
						<Link to="/register" style={{ color: "white" }}>
							Register
						</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;