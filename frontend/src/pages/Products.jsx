import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
	const { user, isAuthenticated } = useContext(AuthContext);

	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [deleteProduct, setDeleteProduct] = useState(null);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		imageUrl: "",
	});

	const itemsPerPage = 4;
	const isAdmin = user?.role === "admin";

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		const response = await axios.get("/products");
		setProducts(response.data);
	};

	const filtered = products.filter((p) =>
		p.name.toLowerCase().includes(search.toLowerCase())
	);

	const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
	const start = (page - 1) * itemsPerPage;
	const currentProducts = filtered.slice(start, start + itemsPerPage);

	const openCreate = () => {
		setEditingProduct(null);
		setFormData({
			name: "",
			description: "",
			price: "",
			stock: "",
			imageUrl: "",
		});
		setShowForm(true);
	};

	const openEdit = (product) => {
		setEditingProduct(product);
		setFormData({
			name: product.name,
			description: product.description || "",
			price: product.price,
			stock: product.stock,
			imageUrl: product.imageUrl || "",
		});
		setShowForm(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (editingProduct) {
			await axios.put(`/products/${editingProduct.id}`, formData);
		} else {
			await axios.post("/products", formData);
		}

		setShowForm(false);
		loadProducts();
	};

	const confirmDelete = async () => {
		await axios.delete(`/products/${deleteProduct.id}`);
		setDeleteProduct(null);
		loadProducts();
	};

	const createOrder = async (product) => {
		if (!isAuthenticated) {
			alert("Please login before creating an order.");
			return;
		}

		await axios.post("/orders", {
			userId: user.id,
			totalAmount: product.price,
			status: "pending",
		});

		alert("Order created successfully.");
	};

	return (
		<div style={pageStyle}>
			<div style={lightWave}></div>
			<div style={redWave}></div>
			<div style={blueWave}></div>

			<div style={boxStyle}>
				<h1 style={titleStyle}>Products</h1>
				<div style={redLine}></div>

				<div style={topBar}>
					<input
						type="text"
						placeholder="Search product..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
						style={searchStyle}
					/>

					{isAdmin && (
						<button style={createButton} onClick={openCreate}>
							+ Create Product
						</button>
					)}
				</div>

				<table style={tableStyle}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{currentProducts.map((product) => (
							<tr key={product.id}>
								<td>{product.name}</td>
								<td>{product.description}</td>
								<td>{product.price} €</td>
								<td>{product.stock}</td>
								<td>
									{isAdmin ? (
										<>
											<button style={editBtn} onClick={() => openEdit(product)}>
												Edit
											</button>
											<button
												style={deleteBtn}
												onClick={() => setDeleteProduct(product)}
											>
												Delete
											</button>
										</>
									) : (
										<button style={createButton} onClick={() => createOrder(product)}>
											Place Order
										</button>
									)}
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

			{showForm && (
				<div style={modalOverlay}>
					<div style={modalBox}>
						<h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>

						<form onSubmit={handleSubmit}>
							<input name="name" placeholder="Name" value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />

							<input name="description" placeholder="Description" value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={inputStyle} />

							<input name="price" placeholder="Price" value={formData.price}
								onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={inputStyle} />

							<input name="stock" placeholder="Stock" value={formData.stock}
								onChange={(e) => setFormData({ ...formData, stock: e.target.value })} style={inputStyle} />

							<input name="imageUrl" placeholder="Image URL" value={formData.imageUrl}
								onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} style={inputStyle} />

							<button style={createButton} type="submit">Save</button>
							<button style={cancelBtn} type="button" onClick={() => setShowForm(false)}>Cancel</button>
						</form>
					</div>
				</div>
			)}

			{deleteProduct && (
				<div style={modalOverlay}>
					<div style={modalBox}>
						<h2>Confirm delete</h2>
						<p>Are you sure you want to delete {deleteProduct.name}?</p>
						<button style={deleteBtn} onClick={confirmDelete}>Delete</button>
						<button style={cancelBtn} onClick={() => setDeleteProduct(null)}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
};

const pageStyle = { position: "relative", minHeight: "calc(100vh - 70px)", padding: "40px 20px 100px", backgroundColor: "#f3f6fb", display: "flex", justifyContent: "center", overflow: "hidden" };
const lightWave = { position: "absolute", bottom: "120px", left: "-10%", width: "120%", height: "240px", backgroundColor: "#e8eef8", borderRadius: "50% 50% 0 0", zIndex: 0 };
const redWave = { position: "absolute", bottom: "70px", left: "-10%", width: "120%", height: "120px", backgroundColor: "#d61f26", borderRadius: "50% 50% 0 0", zIndex: 1 };
const blueWave = { position: "absolute", bottom: "-20px", left: "-10%", width: "120%", height: "160px", backgroundColor: "#0f2f78", borderRadius: "50% 50% 0 0", zIndex: 2 };
const boxStyle = { position: "relative", zIndex: 5, background: "white", padding: "35px", width: "100%", maxWidth: "1100px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", height: "fit-content" };
const titleStyle = { color: "#0f2f78", marginBottom: "10px" };
const redLine = { width: "70px", height: "4px", background: "#d61f26", marginBottom: "25px" };
const topBar = { display: "flex", gap: "15px", marginBottom: "20px" };
const searchStyle = { padding: "10px", width: "260px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "15px" };
const createButton = { padding: "10px 16px", background: "#d61f26", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" };
const editBtn = { marginRight: "8px", padding: "6px 10px", background: "#0f2f78", color: "white", border: "none", cursor: "pointer" };
const deleteBtn = { padding: "6px 10px", background: "#d61f26", color: "white", border: "none", cursor: "pointer" };
const pagination = { marginTop: "20px", display: "flex", gap: "15px", alignItems: "center" };
const pageBtn = { padding: "8px 12px", cursor: "pointer" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 20 };
const modalBox = { background: "white", padding: "30px", borderRadius: "8px", width: "400px" };
const inputStyle = { width: "100%", padding: "10px", marginBottom: "12px", boxSizing: "border-box" };
const cancelBtn = { marginLeft: "10px", padding: "10px 16px", cursor: "pointer" };

export default Products;