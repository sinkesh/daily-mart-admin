import axios from "axios";
import { RoleTypes } from "./Role.types";
const API_BASE = "http://localhost:8000/api/v1";

export const createRole = async (payload: any) => {
    try {
        const response = await axios.post(`${API_BASE}/Create_Role`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating Role:", error.response?.data || error.message);
        throw error;
    }
};

export const getByIdRole = async (role_id: number): Promise<RoleTypes> => {
    const res = await axios.get(`${API_BASE}/Get_ById_Role/${role_id}`);
    const data = res.data.data;
    return {
        role_id: data.role_id,
        role_name: data.role_name,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};

export const updateRoleApi = async (role_id: number, payload: { role_name: string; }) => {
    return axios.put(`${API_BASE}/Edit_Role/${role_id}`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAllRole = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE}/Get_All_Role`);
    return res.data;
};

export const updateRoleStatusApi = async (role_id: number, payload: { status: string }): Promise<void> => {
    try {
        await axios.put(`${API_BASE}/Update_Role_Status/${role_id}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("✅ Role status updated successfully!");
    } catch (error: any) {
        console.error("❌ Error updating Role status:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteRoleApi = async (role_id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/Delete_Role/${role_id}`, {
        data: { status: "INACTIVE" }
    });
};