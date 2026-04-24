import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [deleteOrder, setDeleteOrder] = useState(null);

	const itemsPerPage = 4;

	useEffect(() => {
		loadOrders();
	}, []);

	const loadOrders = async () => {
		const response = await axios.get("/orders");
		setOrders(response.data);
	};

	const filtered = orders.filter((order) =>
		order.status.toLowerCase().includes(search.toLowerCase()) ||
		order.userId.toLowerCase().includes(search.toLowerCase())
	);

	const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
	const start = (page - 1) * itemsPerPage;
	const currentOrders = filtered.slice(start, start + itemsPerPage);

	const updateStatus = async (order) => {
	    const newStatus = prompt("Enter new status:", order.status);

	    if (!newStatus) return;

	    await axios.put(`/orders/${order.id}`, {
		    status: newStatus,
		    totalAmount: Number(order.totalAmount),
	    });

	    loadOrders();
    };

	const confirmDelete = async () => {
		await axios.delete(`/orders/${deleteOrder.id}`);
		setDeleteOrder(null);
		loadOrders();
	};

	return (
		<div style={pageStyle}>
			<div style={lightWave}></div>
			<div style={redWave}></div>
			<div style={blueWave}></div>

			<div style={boxStyle}>
				<h1 style={titleStyle}>Orders</h1>
				<div style={redLine}></div>

				<input
					type="text"
					placeholder="Search by status or user..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setPage(1);
					}}
					style={searchStyle}
				/>

				<table style={tableStyle}>
					<thead>
						<tr>
							<th style={cellStyle}>ID</th>
                            <th style={cellStyle}>Customer ID</th>
                            <th style={cellStyle}>Total</th>
                            <th style={cellStyle}>Status</th>
                            <th style={cellStyle}>Actions</th>
						</tr>
					</thead>

					<tbody>
						{currentOrders.map((order) => (
							<tr key={order.id}>
								<td style={cellStyle} title={order.id}>{order.id.slice(0, 12)}...</td>
                                <td title={order.userId}>{order.userId.slice(0, 12)}...</td>
								<td>{order.totalAmount} €</td>
								<td>{order.status}</td>
								<td>
									<button style={editBtn} onClick={() => updateStatus(order)}>
										Update Status
									</button>
									<button
										style={deleteBtn}
										onClick={() => setDeleteOrder(order)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div style={pagination}>
					<button
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
						style={pageBtn}
					>
						Prev
					</button>

					<span>Page {page} / {totalPages}</span>

					<button
						onClick={() => setPage(page + 1)}
						disabled={page === totalPages}
						style={pageBtn}
					>
						Next
					</button>
				</div>
			</div>

			{deleteOrder && (
				<div style={modalOverlay}>
					<div style={modalBox}>
						<h2>Confirm delete</h2>
						<p>Are you sure you want to delete this order?</p>

						<button style={deleteBtn} onClick={confirmDelete}>
							Delete
						</button>

						<button style={cancelBtn} onClick={() => setDeleteOrder(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const pageStyle = {
	position: "relative",
	minHeight: "calc(100vh - 70px)",
	padding: "40px 20px 100px",
	backgroundColor: "#f3f6fb",
	display: "flex",
	justifyContent: "center",
	overflow: "hidden",
};

const cellStyle = {
	textAlign: "left",
	padding: "8px 12px",
};

const lightWave = {
	position: "absolute",
	bottom: "120px",
	left: "-10%",
	width: "120%",
	height: "240px",
	backgroundColor: "#e8eef8",
	borderRadius: "50% 50% 0 0",
	zIndex: 0,
};

const redWave = {
	position: "absolute",
	bottom: "70px",
	left: "-10%",
	width: "120%",
	height: "120px",
	backgroundColor: "#d61f26",
	borderRadius: "50% 50% 0 0",
	zIndex: 1,
};

const blueWave = {
	position: "absolute",
	bottom: "-20px",
	left: "-10%",
	width: "120%",
	height: "160px",
	backgroundColor: "#0f2f78",
	borderRadius: "50% 50% 0 0",
	zIndex: 2,
};

const boxStyle = {
	position: "relative",
	zIndex: 5,
	background: "white",
	padding: "35px",
	width: "100%",
	maxWidth: "1100px",
	borderRadius: "8px",
	boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
	height: "fit-content",
};

const titleStyle = {
	color: "#0f2f78",
	marginBottom: "10px",
};

const redLine = {
	width: "70px",
	height: "4px",
	background: "#d61f26",
	marginBottom: "25px",
};

const searchStyle = {
	padding: "10px",
	width: "280px",
	marginBottom: "20px",
};

const tableStyle = {
	width: "100%",
	borderCollapse: "separate",
	borderSpacing: "0 10px",
	marginTop: "15px",
};

const editBtn = {
	marginRight: "8px",
	padding: "6px 10px",
	background: "#0f2f78",
	color: "white",
	border: "none",
	cursor: "pointer",
};

const deleteBtn = {
	padding: "6px 10px",
	background: "#d61f26",
	color: "white",
	border: "none",
	cursor: "pointer",
};

const pagination = {
	marginTop: "20px",
	display: "flex",
	gap: "15px",
	alignItems: "center",
};

const pageBtn = {
	padding: "8px 12px",
	cursor: "pointer",
};

const modalOverlay = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0,0,0,0.4)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 20,
};

const modalBox = {
	background: "white",
	padding: "30px",
	borderRadius: "8px",
	width: "400px",
};

const cancelBtn = {
	marginLeft: "10px",
	padding: "6px 10px",
	cursor: "pointer",
};

export default Orders;