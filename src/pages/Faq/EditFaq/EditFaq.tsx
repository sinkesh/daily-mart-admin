import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditFaq.css"; // Use same styles

const EditBrand: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState("active");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("brand") || "[]");
        const barnd = stored.find((c: any) => c.id === parseInt(id!));
        if (barnd) {
            setBrandName(barnd.name);
            setPreview(barnd.image);
            setStatus(barnd.status);
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

        const stored = JSON.parse(localStorage.getItem("brand") || "[]");
        const updated = stored.map((c: any) =>
            c.id === parseInt(id!)
                ? { ...c, name: brandName, image: preview, status }
                : c
        );
        localStorage.setItem("brand", JSON.stringify(updated));
        navigate("/barnd/list");
    };

    return (
        <div className="add-category-container">
            <h2>Edit Brand</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Brand Name"
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

                <button type="submit">Update Brand</button>
            </form>
        </div>
    );
};

export default EditBrand;
