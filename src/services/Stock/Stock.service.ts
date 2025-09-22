import axios from "axios";
import { Stock } from "./Stock.types";
const API_BASE = "http://localhost:8000/api/v1";

// ✅ Create Sub Category
export const createStock = async (payload: any) => {
    try {
        const response = await axios.post(`${API_BASE}/Create_Stock`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating stock:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get ById Sub Catgeory 
export const getStockById = async (id: number): Promise<Stock> => {
    const res = await axios.get(`${API_BASE}/Get_ById_Stock/${id}`);
    const data = res.data.data; // backend returns { code, message, data }
    return {
        stock_id: data.stock_id,
        product_name: data.product_name,
        brand_name: data.brand_name,
        category_name: data.category_name,
        stock_quantity: data.stock_quantity,
        reorder_level: data.reorder_level,
        unit_price: data.unit_price,
        warehouse_location: data.warehouse_location,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};

// ✅ Update Sub Category
export const updateStockApi = async (id: number,
    payload: {
        product_name: string,
        brand_name: string,
        category_name: string,
        stock_quantity: number,
        reorder_level: number,
        unit_price: number,
        warehouse_location: string,
    }) => {
    return axios.put(`${API_BASE}/Edit_Stock/${id}`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// ✅ Get All Categories
export const getAllStock = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE}/Get_All_Stock`);
    return res.data;
};

// ✅ Update Sub Category Status
export const updateStockStatusApi = async (stock_id: number, payload: { status: string }): Promise<void> => {
    try {
        await axios.put(`${API_BASE}/Update_Stock_Status/${stock_id}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("✅ SubCategory status updated successfully!");
    } catch (error: any) {
        console.error("❌ Error updating subcategory status:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete Sub Category
export const deleteStockApi = async (stock_id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/Delete_Stock/${stock_id}`, {
        data: { status: "INACTIVE" }
    });
};