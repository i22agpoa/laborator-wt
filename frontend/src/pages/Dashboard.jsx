import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	return (
		<div style={pageStyle}>
			<div style={lightWave}></div>
			<div style={redWave}></div>
			<div style={blueWave}></div>

			<section style={cardStyle}>
				<div>
					<h1 style={titleStyle}>User Dashboard</h1>
					<div style={redLine}></div>

					<p style={paragraphStyle}>
						Welcome to your private area. From here you can access the
						products and orders sections of the store.
					</p>

					{user && (
						<div style={infoBox}>
							<p><strong>Username:</strong> {user.username}</p>
							<p><strong>Email:</strong> {user.email}</p>
							<p><strong>Role:</strong> {user.role}</p>
						</div>
					)}

					<div style={{ marginTop: "25px" }}>
						<Link to="/products">
							<button style={mainButton}>Products</button>
						</Link>

						<Link to="/orders">
							<button style={secondButton}>Orders</button>
						</Link>
					</div>
				</div>

				<div style={iconBox}>
					<img src="/logo.png" alt="Posadas CF" style={logoStyle} />
				</div>
			</section>
		</div>
	);
};

const pageStyle = {
	position: "relative",
	minHeight: "calc(100vh - 70px)",
	padding: "45px 20px 80px",
	backgroundColor: "#f3f6fb",
	display: "flex",
	justifyContent: "center",
	overflow: "hidden",
};

const lightWave = {
	position: "absolute",
	bottom: "140px",
	left: "-10%",
	width: "120%",
	height: "260px",
	backgroundColor: "#e8eef8",
	borderRadius: "50% 50% 0 0",
	zIndex: 0,
};

const redWave = {
	position: "absolute",
	bottom: "90px",
	left: "-10%",
	width: "120%",
	height: "140px",
	backgroundColor: "#d61f26",
	borderRadius: "50% 50% 0 0",
	zIndex: 1,
};

const blueWave = {
	position: "absolute",
	bottom: "0px",
	left: "-10%",
	width: "120%",
	height: "170px",
	backgroundColor: "#0f2f78",
	borderRadius: "50% 50% 0 0",
	zIndex: 2,
};

const cardStyle = {
	position: "relative",
	zIndex: 5,
	backgroundColor: "white",
	width: "100%",
	maxWidth: "900px",
	padding: "40px 50px",
	borderRadius: "8px",
	boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "35px",
	height: "fit-content",
};

const titleStyle = {
	color: "#0f2f78",
	fontSize: "36px",
	marginBottom: "12px",
};

const redLine = {
	width: "70px",
	height: "4px",
	backgroundColor: "#d61f26",
	marginBottom: "22px",
};

const paragraphStyle = {
	fontSize: "17px",
	lineHeight: "1.5",
	maxWidth: "520px",
};

const infoBox = {
	backgroundColor: "#f3f6fb",
	padding: "18px",
	borderRadius: "6px",
	marginTop: "20px",
};

const iconBox = {
	minWidth: "200px",
	textAlign: "center",
};

const logoStyle = {
	width: "210px",
	maxWidth: "100%",
};

const mainButton = {
	padding: "12px 22px",
	backgroundColor: "#d61f26",
	color: "white",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
	marginRight: "12px",
	fontWeight: "bold",
};

const secondButton = {
	padding: "11px 22px",
	backgroundColor: "white",
	color: "#0f2f78",
	border: "2px solid #0f2f78",
	borderRadius: "5px",
	cursor: "pointer",
	fontWeight: "bold",
};

export default Dashboard;