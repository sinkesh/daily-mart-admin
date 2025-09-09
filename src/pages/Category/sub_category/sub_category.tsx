import React, { useState } from "react";
import "./sub_category.css";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

const SubCatgeoryList: React.FC = () => {
    const [search, setSearch] = useState("");

    const products: Product[] = [
        { id: 1, name: "Laptop", category: "Electronics", price: 60000, stock: 12 },
        { id: 2, name: "Smartphone", category: "Electronics", price: 25000, stock: 30 },
        { id: 3, name: "Shoes", category: "Fashion", price: 3000, stock: 50 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 2, name: "Smartphone", category: "Electronics", price: 25000, stock: 30 },
        { id: 3, name: "Shoes", category: "Fashion", price: 3000, stock: 50 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 2, name: "Smartphone", category: "Electronics", price: 25000, stock: 30 },
        { id: 3, name: "Shoes", category: "Fashion", price: 3000, stock: 50 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
        { id: 4, name: "Watch", category: "Accessories", price: 5000, stock: 15 },
    ];

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="product-container">
            <div className="header-bar">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar"
                />
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price (₹)</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((p, index) => (
                            <tr key={p.id}>
                                <td>{index + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.category}</td>
                                <td>{p.price.toLocaleString()}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button className="btn-edit">Edit</button>
                                    <button className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "12px" }}>
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SubCatgeoryList;
