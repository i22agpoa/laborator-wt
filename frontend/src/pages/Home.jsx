import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	return (
		<div style={pageStyle}>
			<div style={lightWave}></div>
			<div style={redWave}></div>
			<div style={blueWave}></div>

			<section style={heroStyle}>
				<div style={heroText}>
					<h1 style={titleStyle}>Official Posadas CF Store</h1>
					<div style={redLine}></div>

					<p style={paragraphStyle}>
						Posadas CF is a football club from Posadas, Córdoba, with a strong
						local identity and a close connection with its supporters.
					</p>

					<p style={paragraphStyle}>
						The team plays its home matches at the Estadio Municipal Víctor
						Méndez, where many generations of fans have supported the club.
					</p>

					<p style={paragraphStyle}>
						This website allows supporters to view club merchandise, check
						available products and manage orders online.
					</p>

					<div style={{ marginTop: "25px" }}>
						<Link to="/products">
							<button style={mainButton}>View Products</button>
						</Link>

						<Link to="/login">
							<button style={secondButton}>Login</button>
						</Link>
					</div>
				</div>

				<img src="/logo.png" alt="Posadas CF" style={logoStyle} />
			</section>

			<section style={cardsContainer}>
				<div style={cardStyle}>
					<div style={iconCircle}>👕</div>
					<div>
						<h3 style={cardTitle}>Products</h3>
						<div style={smallRedLine}></div>
						<p style={cardText}>Browse available club products.</p>
					</div>
				</div>

				<div style={cardStyle}>
					<div style={iconCircle}>🛒</div>
					<div>
						<h3 style={cardTitle}>Orders</h3>
						<div style={smallRedLine}></div>
						<p style={cardText}>Create and manage orders easily.</p>
					</div>
				</div>

				<div style={cardStyle}>
					<div style={iconCircle}>👤</div>
					<div>
						<h3 style={cardTitle}>Authentication</h3>
						<div style={smallRedLine}></div>
						<p style={cardText}>Login or register to access private features.</p>
					</div>
				</div>
			</section>
		</div>
	);
};

const pageStyle = {
	position: "relative",
	minHeight: "calc(100vh - 70px)",
	padding: "21px 20px 80px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	overflow: "hidden",
	backgroundColor: "#f3f6fb",
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

const heroStyle = {
	position: "relative",
	zIndex: 5,
	backgroundColor: "white",
	width: "100%",
	maxWidth: "1050px",
	padding: "42px 55px",
	borderRadius: "8px",
	boxShadow: "0 3px 12px rgba(0,0,0,0.12)",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	gap: "35px",
};

const heroText = {
	maxWidth: "620px",
};

const titleStyle = {
	color: "#0f2f78",
	fontSize: "42px",
	marginBottom: "15px",
};

const redLine = {
	width: "85px",
	height: "4px",
	backgroundColor: "#d61f26",
	marginBottom: "25px",
};

const paragraphStyle = {
	fontSize: "17px",
	lineHeight: "1.5",
	maxWidth: "600px",
	marginBottom: "12px",
};

const logoStyle = {
	width: "270px",
	maxWidth: "100%",
};

const mainButton = {
	padding: "13px 24px",
	backgroundColor: "#d61f26",
	color: "white",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
	marginRight: "12px",
	fontWeight: "bold",
};

const secondButton = {
	padding: "12px 24px",
	backgroundColor: "white",
	color: "#0f2f78",
	border: "2px solid #0f2f78",
	borderRadius: "5px",
	cursor: "pointer",
	fontWeight: "bold",
};

const cardsContainer = {
	position: "relative",
	zIndex: 5,
	marginTop: "35px",
	width: "100%",
	maxWidth: "1050px",
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
	gap: "25px",
};

const cardStyle = {
	backgroundColor: "white",
	padding: "28px",
	borderRadius: "8px",
	boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
	display: "flex",
	gap: "22px",
	alignItems: "flex-start",
	minHeight: "135px",
};

const iconCircle = {
	width: "58px",
	height: "58px",
	borderRadius: "50%",
	backgroundColor: "#0f2f78",
	color: "white",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "28px",
	flexShrink: 0,
};

const cardTitle = {
	color: "#0f2f78",
	margin: "0 0 8px",
};

const smallRedLine = {
	width: "45px",
	height: "3px",
	backgroundColor: "#d61f26",
	marginBottom: "15px",
};

const cardText = {
	margin: 0,
	lineHeight: "1.5",
};

export default Home;