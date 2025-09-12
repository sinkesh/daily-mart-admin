import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditSubCategory.css"; // Use same styles

const EditCategory: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [categoryName, setSubCategoryName] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState("active");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("categories") || "[]");
        const category = stored.find((c: any) => c.id === parseInt(id!));
        if (category) {
            setSubCategoryName(category.name);
            setPreview(category.image);
            setStatus(category.status);
        }
    }, [id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const stored = JSON.parse(localStorage.getItem("categories") || "[]");
        const updated = stored.map((c: any) =>
            c.id === parseInt(id!)
                ? { ...c, name: categoryName, image: preview, status }
                : c
        );
        localStorage.setItem("categories", JSON.stringify(updated));
        navigate("/category/list");
    };

    return (
        <div className="add-category-container">
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Category Name"
                />

                <div className="image-upload-box">
                    {preview ? (
                        <img src={preview} alt="Preview" className="preview-image" />
                    ) : (
                        <span>Click to upload image</span>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Status: </label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <button type="submit">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;
