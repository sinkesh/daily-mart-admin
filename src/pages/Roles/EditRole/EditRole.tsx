import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditRole.css";
import { getByIdRole, updateRoleApi } from "../../../services/Role/Role.service";

const EditRole: React.FC = () => {
    const { role_id } = useParams<{ role_id: string }>();
    const navigate = useNavigate();

    const [role_name, setRoleName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("FAQ ID from params:", role_id);

        const fetchRole = async () => {
            if (!role_id) return;
            try {
                const id = parseInt(role_id);
                const data = await getByIdRole(id);

                setRoleName(data?.role_name ?? "");
            } catch (error) {
                console.error("Error fetching FAQ:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [role_id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role_id) return;
        try {
            const id = parseInt(role_id);
            const payload = { role_name };
            await updateRoleApi(id, payload);
            navigate("/role/list");
        } catch (error) {
            console.error("Error updating FAQ:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    return (
        <div className="add-category-container">
            <h2>Edit Role</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={role_name}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Role Name"
                />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditRole;