import axios from "axios";
import { Faq } from "./Faq.types";
const API_BASE = "http://localhost:8000/api/v1";

// ✅ Create Faq
export const createFaq = async (payload: any) => {
    try {
        const response = await axios.post(`${API_BASE}/Create_Faq`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating faq:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get ById Faq
export const getByIdFaq = async (faq_id: number): Promise<Faq> => {
    const res = await axios.get(`${API_BASE}/Get_ById_Faq/${faq_id}`);
    const data = res.data.data;
    console.log("data", data)
    return {
        faq_id: data.faq_id,
        question: data.question,
        answer: data.answer,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};

// ✅ Update Faq
export const updateFaqApi = async (faq_id: number, payload: { question: string; answer: string }) => {
    return axios.put(`${API_BASE}/Edit_Faq/${faq_id}`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// ✅ Get All Faq
export const getAllFaq = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE}/Get_All_Faq`);
    return res.data;
};

// ✅ Update Faq Status
export const updateFaqStatusApi = async (faq_id: number, payload: { status: string }): Promise<void> => {
    try {
        await axios.put(`${API_BASE}/Update_Faq_Status/${faq_id}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("✅ faq status updated successfully!");
    } catch (error: any) {
        console.error("❌ Error updating faq status:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete Faq
export const deleteFaqApi = async (faq_id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/Delete_Faq/${faq_id}`, {
        data: { status: "INACTIVE" }
    });
};