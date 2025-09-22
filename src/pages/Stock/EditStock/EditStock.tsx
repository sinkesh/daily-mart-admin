import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStock.css";
import { getStockById, updateStockApi } from "../../../services/Stock/Stock.service";

const EditStock: React.FC = () => {
    const { stock_id } = useParams<{ stock_id: string }>(); // ✅ Correct param name
    const navigate = useNavigate();

    // ✅ State variables for stock fields
    const [productName, setProductName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [stockQuantity, setStockQuantity] = useState<number | string>("");
    const [reorderLevel, setReorderLevel] = useState<number | string>("");
    const [unitPrice, setUnitPrice] = useState<number | string>("");
    const [warehouseLocation, setWarehouseLocation] = useState("");
    const [loading, setLoading] = useState(true);

    // ✅ Fetch Stock Data by ID
    useEffect(() => {
        console.log("Stock ID from params:", stock_id);

        const fetchStock = async () => {
            if (!stock_id) return;
            try {
                const id = parseInt(stock_id);
                const data = await getStockById(id);

                setProductName(data?.product_name ?? "");
                setBrandName(data?.brand_name ?? "");
                setCategoryName(data?.category_name ?? "");
                setStockQuantity(data?.stock_quantity ?? "");
                setReorderLevel(data?.reorder_level ?? "");
                setUnitPrice(data?.unit_price ?? "");
                setWarehouseLocation(data?.warehouse_location ?? "");
            } catch (error) {
                console.error("Error fetching stock:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStock();
    }, [stock_id]);

    // ✅ Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stock_id) return;

        try {
            const id = parseInt(stock_id);
            const payload = {
                product_name: productName,
                brand_name: brandName,
                category_name: categoryName,
                stock_quantity: Number(stockQuantity),
                reorder_level: Number(reorderLevel),
                unit_price: Number(unitPrice),
                warehouse_location: warehouseLocation,
            };

            await updateStockApi(id, payload);
            navigate("/stock/list");
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="add-category-container">
            <h2>Edit Stock</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                />
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Brand Name"
                />
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Category Name"
                />
                <input
                    type="text"
                    value={stockQuantity}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setStockQuantity(val); // sirf numbers allow
                    }}
                    placeholder="Stock Quantity"
                />

                <input
                    type="text"
                    value={reorderLevel}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setReorderLevel(val);
                    }}
                    placeholder="Reorder Level"
                />

                <input
                    type="text"
                    value={unitPrice}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*\.?\d*$/.test(val)) setUnitPrice(val); // decimal allowed
                    }}
                    placeholder="Unit Price"
                />

                <input
                    type="text"
                    value={warehouseLocation}
                    onChange={(e) => setWarehouseLocation(e.target.value)}
                    placeholder="Warehouse Location"
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditStock;
