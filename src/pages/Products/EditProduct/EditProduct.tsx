import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.css";
import { getByIdProduct, updateProductApi } from "../../../services/Products/Product.service";

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

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

    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // --- FETCH PRODUCT DATA ---
    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await getByIdProduct(id);
                setProductData(response.data);
                if (response.data.thumbnail_image) setPreviewImage(response.data.thumbnail_image);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                alert("Failed to load product data");
            }
        };

        fetchProduct();
    }, [id]);

    // --- HANDLE FORM CHANGE ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setProductData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // --- HANDLE IMAGE ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setThumbnailImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // --- HANDLE SUBMIT ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const formData = new FormData();
            Object.entries(productData).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    formData.append(key, String(value));
                }
            });
            if (thumbnailImage) formData.append("thumbnail_image", thumbnailImage);
            await updateProductApi(id, formData);
            navigate("/product/list");
        } catch (error) {
            console.error("Failed to update product:", error);
            alert("Failed to update product");
        }
    };


    return (
        <div className="add-product-container">
            <form onSubmit={handleSubmit} className="add-product-form">

                {/* --- BASIC INFO --- */}
                <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                        <div>
                            <label htmlFor="product_name">Product Name</label>
                            <input id="product_name" type="text" name="product_name" value={productData.product_name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="product_slug">Product Slug</label>
                            <input id="product_slug" type="text" name="product_slug" value={productData.product_slug} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="brand_name">Brand Name</label>
                            <input id="brand_name" type="text" name="brand_name" value={productData.brand_name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="category_name">Category Name</label>
                            <input id="category_name" type="text" name="category_name" value={productData.category_name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="product_sku">SKU</label>
                            <input id="product_sku" type="text" name="product_sku" value={productData.product_sku} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="hsn_code">HSN Code</label>
                            <input id="hsn_code" type="text" name="hsn_code" value={productData.hsn_code} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* --- PRICING & STOCK --- */}
                <div className="form-section">
                    <h3>Pricing & Inventory</h3>
                    <div className="form-grid">
                        <div>
                            <label htmlFor="unit_price">Unit Price</label>
                            <input id="unit_price" type="number" name="unit_price" value={productData.unit_price} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="discount_price">Discount Price</label>
                            <input id="discount_price" type="number" name="discount_price" value={productData.discount_price} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="currency">Currency</label>
                            <input id="currency" type="text" name="currency" value={productData.currency} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="tax_rate">Tax Rate (%)</label>
                            <input id="tax_rate" type="number" name="tax_rate" value={productData.tax_rate} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="stock_quantity">Stock Quantity</label>
                            <input id="stock_quantity" type="number" name="stock_quantity" value={productData.stock_quantity} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="reorder_level">Reorder Level</label>
                            <input id="reorder_level" type="number" name="reorder_level" value={productData.reorder_level} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* --- ADDITIONAL DETAILS --- */}
                <div className="form-section">
                    <h3>Additional Details</h3>
                    <div className="form-grid">
                        <div>
                            <label htmlFor="warehouse_location">Warehouse Location</label>
                            <input id="warehouse_location" type="text" name="warehouse_location" value={productData.warehouse_location} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="weight">Weight</label>
                            <input id="weight" type="number" name="weight" value={productData.weight} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="dimensions">Dimensions</label>
                            <input id="dimensions" type="text" name="dimensions" value={productData.dimensions} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="color">Color</label>
                            <input id="color" type="text" name="color" value={productData.color} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="size">Size</label>
                            <input id="size" type="text" name="size" value={productData.size} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="material">Material</label>
                            <input id="material" type="text" name="material" value={productData.material} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="tags">Tags</label>
                            <input id="tags" type="text" name="tags" value={productData.tags} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* --- HIGHT LIGHT --- */}
                <div className="form-section">
                    <h3>Highlight</h3>
                    <div
                        className="highlight-options"
                        style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "flex-start", flexWrap: "nowrap", gap: "25px" }}  >
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", fontSize: "16px", fontWeight: "500" }} >
                            <input type="radio" name="highlight_option" value="best_seller" onChange={handleChange} />
                            Best Seller
                        </label>

                        <label style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", fontSize: "16px", fontWeight: "500" }} >
                            <input type="radio" name="highlight_option" value="new_launched" onChange={handleChange} />
                            New Launched
                        </label>

                        <label style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", fontSize: "16px", fontWeight: "500" }} >
                            <input type="radio" name="highlight_option" value="top_discount_offer" onChange={handleChange} />
                            Top Discount Offer
                        </label>

                        <label style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", fontSize: "16px", fontWeight: "500" }} >
                            <input type="radio" name="highlight_option" value="trending_offer" onChange={handleChange} />
                            Trending Offer
                        </label>
                    </div>
                </div>

                {/* --- FEATURED TOGGLE --- */}
                <div className="form-section">
                    <label className="checkbox-label">
                        <input type="checkbox" name="is_featured" checked={productData.is_featured} onChange={handleChange} />
                        Mark as Featured Product
                    </label>
                </div>

                {/* --- DESCRIPTION --- */}
                <div className="form-section">
                    <h3>Description</h3>
                    <div className="description-row">
                        <div className="description-box">
                            <label htmlFor="product_description">Product Description</label>
                            <textarea id="product_description" name="product_description" value={productData.product_description} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="short_description">Short Description</label>
                            <textarea id="short_description" name="short_description" value={productData.short_description} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="how_to_use">How to use</label>
                            <textarea id="how_to_use" name="how_to_use" value={productData.how_to_use} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="safety_instruction">Safety Instruction</label>
                            <textarea id="safety_instruction" name="safety_instruction" value={productData.safety_instruction} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea id="ingredients" name="ingredients" value={productData.ingredients} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="composition_information">Composition Information</label>
                            <textarea id="composition_information" name="composition_information" value={productData.composition_information} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="additional_information">Additional Information</label>
                            <textarea id="additional_information" name="additional_information" value={productData.additional_information} onChange={handleChange} />
                        </div>

                        <div className="description-box">
                            <label htmlFor="long_description">Long Description</label>
                            <textarea id="long_description" name="long_description" value={productData.long_description} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Media</h3>
                    <div className="image-upload-box">
                        {previewImage ? <img src={previewImage} alt="Thumbnail Preview" className="preview-image" /> : <span>Click to upload thumbnail</span>}
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                </div>


                {/* --- SUBMIT BUTTON --- */}
                <div className="button-container">
                    <button type="submit" className="submit-btn">Update</button>
                </div>

            </form>
        </div>
    );
};

export default EditProduct;
