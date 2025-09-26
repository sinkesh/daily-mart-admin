import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/Table/Table";
import "./ReviewList.css";
import { getAllProduct, updateProductStatusApi } from "../../../services/Products/Product.service";
import { ProductTypes } from "../../../services/Products/Product.types";

const ProductList: React.FC = () => {
    const [search, setSearch] = useState("");
    const [product, setProduct] = useState<ProductTypes[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();
    const calledOnce = useRef(false);

    // ✅ Load product from API
    const loadProduct = async () => {
        try {
            const response = await getAllProduct();
            const data = response.data || response;

            if (Array.isArray(data)) {
                const mapped: ProductTypes[] = data.map((c: any) => ({
                    product_id: c.product_id,
                    product_name: c.product_name,
                    product_slug: c.product_slug,
                    product_description: c.product_description,
                    short_description: c.short_description,
                    brand_name: c.brand_name,
                    category_name: c.category_name,
                    sku: c.sku,
                    hsn_code: c.hsn_code,
                    unit_price: c.unit_price,
                    discount_price: c.discount_price,
                    currency: c.currency,
                    tax_rate: c.tax_rate,
                    stock_quantity: c.stock_quantity,
                    reorder_level: c.reorder_level,
                    warehouse_location: c.warehouse_location,
                    weight: c.weight,
                    dimensions: c.dimensions, // assuming JSON
                    color: c.color,
                    size: c.size,
                    material: c.material,
                    tags: c.tags, // assuming JSON
                    thumbnail_image: c.thumbnail_image,
                    video_url: c.video_url,
                    is_featured: c.is_featured,
                    created_by: c.created_by,
                    updated_by: c.updated_by,
                    status: c.status.toLowerCase() === "active" ? "active" : "inactive",
                }));

                setProduct(mapped);
            } else {
                console.error("Invalid response:", data);
                setProduct([]);
            }
        } catch (error) {
            console.error("Error fetching:", error);
            setProduct([]);
        }
    };

    useEffect(() => {
        if (calledOnce.current) return;
        calledOnce.current = true;
        loadProduct();
    }, []);

    // ✅ Toggle Status
    const toggleStatus = async (product_id: number, currentStatus: string) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        try {
            await updateProductStatusApi(product_id, { status: newStatus });
            const updated = product.map((cat) =>
                cat.product_id === product_id ? { ...cat, status: newStatus } : cat
            );
            setProduct(updated);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status!");
        }
    };

    // // ✅ Delete Category
    // const handleDeleteCategory = async (product_id: number) => {
    //   try {
    //     await deleteCategoryApi(product_id);
    //     setProduct((prev) => prev.filter((cat) => cat.product_id !== product_id));
    //   } catch (error) {
    //     console.error("Error deleting:", error);
    //   }
    // };

    // ✅ Filtered Data
    const filtered = Array.isArray(product)
        ? product.filter((c) =>
            c.product_name?.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    // ✅ Pagination Logic
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

    const columns = [
        { key: "product_id", label: "#" },
        {
            key: "thumbnail_image",
            label: "Image",
            render: (value: string) =>
                value ? (
                    <img
                        src={value}
                        alt="Product"
                        style={{
                            width: "30px",
                            height: "30px",
                            objectFit: "contain",
                            borderRadius: "10px",
                            border: "1px solid #ddd",
                        }}
                    />
                ) : (
                    "No Image"
                ),
        },
        {
            key: "product_name",
            label: "Customer Name",
            render: (value: string) =>
                value && value.length > 12 ? value.substring(0, 12) + "..." : value,
        },
        { key: "category_name", label: "Product Name" },
        { key: "unit_price", label: "Rating" },
        { key: "discount_price", label: "Discount Price" },
        { key: "sku", label: "Review Message" },
        { key: "stock_quantity", label: "Date" },
        {
            key: "status",
            label: "Status",
            render: (value: string, row: any) => (
                <span
                    className="status-badge"
                    style={{
                        backgroundColor: value === "active" ? "#d4f5d4" : "#f5d4d4",
                        color: value === "active" ? "green" : "red",
                        cursor: "pointer",
                    }}
                    onClick={() => toggleStatus(row.product_id, row.status)}
                >
                    {value === "active" ? "Active" : "Inactive"}
                </span>
            ),
        },
    ];

    return (
        <div className="category-container">
            <div className="header-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // ✅ reset page on search
                    }}
                    className="search-bar"
                />
                <button className="add-btn" onClick={() => navigate("/add/product")}>
                    Add Product
                </button>
            </div>

            {/* ✅ Table with paginated data */}
            <CommonTable
                columns={columns}
                data={paginatedData}
                tableClassName="compact-table"
                actions={(row) => (
                    <>
                        <button className="action-btn edit" onClick={() => setSelectedProduct(row)}> View</button>
                        <button className="action-btn edit" onClick={() => navigate(`/edit/product/${row.product_id}`)}> Edit </button>
                        {/* <button className="action-btn delete" onClick={() => handleDeleteCategory(row.id)}> Delete</button> */}
                    </>
                )}
            />

            {/* ✅ Pagination Controls */}
            <div className="pagination">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} > Previous </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}> Next </button>
            </div>

            {/* ✅ Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Category Details</h3>
                        <table className="details-table">
                            <tbody>
                                <tr>
                                    <td><strong>ID</strong></td>
                                    <td>{selectedProduct.product_id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Product Name</strong></td>
                                    <td>{selectedProduct.product_name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Category Name</strong></td>
                                    <td>{selectedProduct.category_name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Status</strong></td>
                                    <td>
                                        <span
                                            className="status-badge"
                                            style={{
                                                backgroundColor:
                                                    selectedProduct.status === "active" ? "#d4f5d4" : "#f5d4d4",
                                                color:
                                                    selectedProduct.status === "active" ? "green" : "red",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                setSelectedProduct({
                                                    ...selectedProduct,
                                                    status: selectedProduct.status === "active" ? "inactive" : "active",
                                                })
                                            }
                                        >
                                            {selectedProduct.status === "active" ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Image</strong></td>
                                    <td>
                                        {selectedProduct.thumbnail_image ? (
                                            <img
                                                src={selectedProduct.thumbnail_image}
                                                alt={selectedProduct.thumbnail_image}
                                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="add-btn" onClick={() => setSelectedProduct(null)} style={{ marginTop: "15px" }} > Close </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;