import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "active",
        image: "", // ✅ Added
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ New handler for image input
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setForm({ ...form, image: reader.result as string });
            };
            reader.readAsDataURL(e.target.files[0]); // Convert image to Base64
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem("products") || "[]");

        const newProduct = {
            id: existing.length + 1,
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
        };

        localStorage.setItem("products", JSON.stringify([...existing, newProduct]));

        navigate("/products/list");
    };

    return (
        <div className="add-product-page">
            <div className="add-product-card">
                <h2 className="form-title">📦 Add New Product</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            required
                        />
                    </div>

                    {/* ✅ Image Upload Field */}
                    <div className="form-group">
                        <label>Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {form.image && (
                            <img
                                src={form.image}
                                alt="Preview"
                                style={{
                                    marginTop: "10px",
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                }}
                            />
                        )}
                    </div>

                    <button type="submit" className="submit-btn">
                        ➕ Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
