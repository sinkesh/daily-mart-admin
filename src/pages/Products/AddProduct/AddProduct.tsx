import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/Products/Product.service";
import { FaUpload } from "@react-icons/all-files/fa/FaUpload";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaSave } from "@react-icons/all-files/fa/FaSave";

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

    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const navigate = useNavigate();

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
            return value !== "" && value !== null && value !== undefined && value !== 0;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setProductData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setThumbnailImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
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

    const renderInput = (label: string, name: string, type: string = "text", placeholder: string = "") => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder || label}
                value={(productData as any)[name]}
                onChange={handleChange}
                className="input-field"
            />
        </div>
    );

    const renderTextarea = (label: string, name: string, placeholder: string = "") => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <textarea
                name={name}
                placeholder={placeholder || label}
                value={(productData as any)[name]}
                onChange={handleChange}
                className="input-field min-h-[100px]"
            />
        </div>
    );

    return (
        <div className="product-container">
            <div className="header-bar">
                <button className="collapse-btn !w-auto px-4 gap-2" onClick={() => navigate("/product/list")}>
                    <FaChevronLeft /> Back to List
                </button>
            </div>

            <form className="ap-card !max-w-full" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <h2 className="!mb-0">Add New Product</h2>
                    <div className="flex gap-3">
                        <button 
                            type="button" 
                            className="btn !bg-slate-800 !from-slate-800 !to-slate-900"
                            onClick={() => navigate("/product/list")}
                        >
                            Cancel
                        </button>
                        <button
                            className="ap-submit !py-2"
                            type="submit"
                            disabled={!isFormValid()}
                        >
                            <FaSave className="mr-2" /> Save Product
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                                Basic Information
                            </h3>
                            <div className="ap-grid">
                                {renderInput("Product Name *", "product_name")}
                                {renderInput("Product Slug *", "product_slug")}
                                {renderInput("Brand Name *", "brand_name")}
                                {renderInput("Category Name *", "category_name")}
                                {renderInput("SKU", "product_sku")}
                                {renderInput("UOM", "uom", "text", "e.g. Kg, Pcs")}
                            </div>
                        </section>

                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                                Pricing & Inventory
                            </h3>
                            <div className="ap-grid">
                                {renderInput("Unit Price *", "unit_price", "number")}
                                {renderInput("Discount Price", "discount_price", "number")}
                                {renderInput("Tax Rate (%)", "tax_rate", "number")}
                                {renderInput("Stock Quantity *", "stock_quantity", "number")}
                                {renderInput("Reorder Level", "reorder_level", "number")}
                                {renderInput("HSN Code", "hsn_code")}
                            </div>
                        </section>

                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                                Detailed Descriptions
                            </h3>
                            <div className="space-y-5">
                                {renderTextarea("Short Description", "short_description")}
                                {renderTextarea("Full Description", "product_description")}
                                {renderTextarea("Ingredients", "ingredients")}
                                {renderTextarea("How to Use", "how_to_use")}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN: Sidebar Info */}
                    <div className="space-y-8">
                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                                Product Media
                            </h3>
                            <div className="ap-image-box group">
                                {previewImage ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewImage} alt="preview" className="ap-preview h-48 w-full object-cover rounded-xl" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                            <p className="text-white text-xs font-bold">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-3">
                                            <FaUpload className="text-cyan-400" />
                                        </div>
                                        <p className="text-sm font-semibold">Upload Thumbnail</p>
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        </section>

                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-rose-400"></span>
                                Shipping & Logistics
                            </h3>
                            <div className="space-y-4">
                                {renderInput("Weight (kg)", "weight", "number")}
                                {renderInput("Dimensions", "dimensions", "text", "LxWxH")}
                                {renderInput("Warehouse Location", "warehouse_location")}
                            </div>
                        </section>

                        <section className="ap-section">
                            <h3 className="flex items-center gap-2 border-b border-white/5 pb-3 mb-5">
                                <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                Attributes & Tags
                            </h3>
                            <div className="space-y-4">
                                {renderInput("Color", "color")}
                                {renderInput("Size", "size")}
                                {renderInput("Tags", "tags", "text", "comma separated")}
                            </div>
                        </section>
                    </div>
                </div>

                <div className="ap-submit-wrapper mt-8 pt-6 border-t border-white/5">
                    <button
                        className="ap-submit px-10 py-4 text-base"
                        type="submit"
                        disabled={!isFormValid()}
                    >
                        <FaSave className="mr-2" /> Save & Publish Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;