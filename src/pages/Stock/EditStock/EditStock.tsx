import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStock.css";

const EditStock: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [stockName, setStockName] = useState("");
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [preview, setPreview] = useState<string | null>(null);

    // ✅ 1. Load Data
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("stock") || "[]");
        console.log("Stored Stock:", stored); // Debugging
        console.log("Edit ID:", id);

        const stockItem = stored.find((item: any) => item.id === Number(id));
        if (!stockItem) {
            alert("Stock not found!");
            navigate("/stock/list");
            return;
        }

        setStockName(stockItem.name);
        setSku(stockItem.sku);
        setQuantity(String(stockItem.quantity));
        setPrice(String(stockItem.price));
        setPreview(stockItem.image);
    }, [id, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!stockName.trim() || !sku.trim() || quantity === "" || price === "") {
            alert("All fields are required!");
            return;
        }

        const stored = JSON.parse(localStorage.getItem("stock") || "[]");
        const updated = stored.map((item: any) =>
            item.id === Number(id)
                ? {
                    ...item,
                    name: stockName,
                    sku,
                    quantity: Number(quantity),
                    price: Number(price),
                    image: preview,
                }
                : item
        );

        localStorage.setItem("stock", JSON.stringify(updated));
        navigate("/stock/list");
    };

    return (
        <div className="add-category-container">
            <h2>Edit Stock</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={stockName}
                    onChange={(e) => setStockName(e.target.value)}
                    placeholder="Enter Stock Name"
                />
                <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter SKU"
                />
                <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setQuantity(val);
                    }}
                    placeholder="Enter Quantity"
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) setPrice(val);
                    }}
                    placeholder="Enter Price"
                />

                <div className="image-upload-box">
                    {preview ? (
                        <img src={preview} alt="Preview" className="preview-image" />
                    ) : (
                        <span>Click to upload image</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <button type="submit">Update Stock</button>
            </form>
        </div>
    );
};

export default EditStock;
