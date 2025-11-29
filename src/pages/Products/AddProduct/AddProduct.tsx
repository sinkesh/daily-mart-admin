import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/Products/Product.service";
import "./AddProduct.css";

const AddProduct: React.FC = () => {
    const [productData, setProductData] = useState({
        product_name: "",
        product_slug: "",
        product_description: "",
        short_description: "",
        how_to_use: "",
        safety_instruction: "",
        ingredients: "",
        composition_information: "",
        additional_information: "",
        long_description: "",
        highlight: "",
        brand_name: "",
        category_name: "",
        product_sku: "",
        uom: "",
        offer_price: "",
        hsn_code: "",
        unit_price: 0,
        discount_price: 0,
        currency: "INR",
        tax_rate: 0,
        stock_quantity: 0,
        reorder_level: 0,
        warehouse_location: "",
        weight: 0,
        dimensions: "",
        color: "",
        size: "",
        material: "",
        tags: "",
        is_featured: false,
    });

    const isFormValid = () => {
        const requiredFields = [
            "product_name",
            "product_slug",
            "brand_name",
            "category_name",
            "unit_price",
            "stock_quantity",
        ];

        return requiredFields.every((field) => {
            const value = productData[field as keyof typeof productData];
            return value !== "" && value !== null && value !== undefined;
        });
    };


    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0] || null;
        setThumbnailImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!isFormValid()) {
            alert("Please fill all required fields!");
            return;
        }

        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        if (thumbnailImage) {
            formData.append("thumbnail_image", thumbnailImage);
        }

        try {
            await createProduct(formData);
            navigate("/product/list");
        } catch (err) {
            console.error(err);
            alert("Server error, please check your data or server logs.");
        }
    };


    return (
        <form className="ap-card" onSubmit={handleSubmit}>
            <h2 className="ap-title">Add New Product</h2>

            {/* BASIC DETAILS */}
            <section className="ap-section">
                <h3>Basic Details</h3>
                <div className="ap-grid">
                    <input placeholder="Product Name" name="product_name" value={productData.product_name} onChange={handleChange} />
                    <input placeholder="Product Slug" name="product_slug" value={productData.product_slug} onChange={handleChange} />
                    <input placeholder="Brand Name" name="brand_name" value={productData.brand_name} onChange={handleChange} />
                    <input placeholder="Category Name" name="category_name" value={productData.category_name} onChange={handleChange} />
                    <input placeholder="SKU" name="product_sku" value={productData.product_sku} onChange={handleChange} />
                    <input placeholder="UOM" name="uom" value={productData.uom} onChange={handleChange} />
                    <input placeholder="Offer Price" name="offer_price" value={productData.offer_price} onChange={handleChange} />
                    <input placeholder="HSN Code" name="hsn_code" value={productData.hsn_code} onChange={handleChange} />
                </div>
            </section>

            {/* PRICING */}
            <section className="ap-section">
                <h3>Pricing & Inventory</h3>
                <div className="ap-grid">
                    <input type="number" placeholder="Unit Price" name="unit_price" value={productData.unit_price} onChange={handleChange} />
                    <input type="number" placeholder="Discount Price" name="discount_price" value={productData.discount_price} onChange={handleChange} />
                    <input placeholder="Currency" name="currency" value={productData.currency} onChange={handleChange} />
                    <input type="number" placeholder="Tax Rate (%)" name="tax_rate" value={productData.tax_rate} onChange={handleChange} />
                    <input type="number" placeholder="Stock Quantity" name="stock_quantity" value={productData.stock_quantity} onChange={handleChange} />
                    <input type="number" placeholder="Reorder Level" name="reorder_level" value={productData.reorder_level} onChange={handleChange} />
                </div>
            </section>

            {/* EXTRA DETAILS */}
            <section className="ap-section">
                <h3>Extra Information</h3>
                <div className="ap-grid">
                    <input placeholder="Warehouse Location" name="warehouse_location" value={productData.warehouse_location} onChange={handleChange} />
                    <input type="number" placeholder="Weight" name="weight" value={productData.weight} onChange={handleChange} />
                    <input placeholder="Dimensions" name="dimensions" value={productData.dimensions} onChange={handleChange} />
                    <input placeholder="Color" name="color" value={productData.color} onChange={handleChange} />
                    <input placeholder="Size" name="size" value={productData.size} onChange={handleChange} />
                    <input placeholder="Material" name="material" value={productData.material} onChange={handleChange} />
                    <input placeholder="Tags" name="tags" value={productData.tags} onChange={handleChange} />
                </div>
            </section>

            {/* TEXTAREAS */}
            <section className="ap-section">
                <h3>Descriptions</h3>
                <textarea placeholder="Product Description" name="product_description" value={productData.product_description} onChange={handleChange} />
                <textarea placeholder="Short Description" name="short_description" value={productData.short_description} onChange={handleChange} />
                <textarea placeholder="How to Use" name="how_to_use" value={productData.how_to_use} onChange={handleChange} />
                <textarea placeholder="Safety Instruction" name="safety_instruction" value={productData.safety_instruction} onChange={handleChange} />
                <textarea placeholder="Ingredients" name="ingredients" value={productData.ingredients} onChange={handleChange} />
                <textarea placeholder="Composition Information" name="composition_information" value={productData.composition_information} onChange={handleChange} />
                <textarea placeholder="Additional Information" name="additional_information" value={productData.additional_information} onChange={handleChange} />
                <textarea placeholder="Long Description" name="long_description" value={productData.long_description} onChange={handleChange} />
            </section>

            {/* IMAGE UPLOAD */}
            <section className="ap-section">
                <h3>Product Image</h3>
                <div className="ap-image-box">
                    {previewImage ? (
                        <img src={previewImage} alt="preview" className="ap-preview" />
                    ) : (
                        <p>Drag or Click to Upload</p>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
            </section>

            {/* SUBMIT */}
            <div className="ap-submit-wrapper">
                <button
                    className="ap-submit"
                    type="submit"
                    disabled={!isFormValid()}
                    style={{
                        opacity: !isFormValid() ? 0.5 : 1,
                        cursor: !isFormValid() ? "not-allowed" : "pointer"
                    }}
                >
                    Save Product
                </button>
            </div>

        </form>
    );
};

export default AddProduct;