import axios from "axios";
import { Faq } from "./Faq.types";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

export const createFaq = async (payload: any) => {
    try {
        const response = await axios.post(`${API_BASE_NAME}/Create_Faq`, payload, {
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

export const getByIdFaq = async (faq_id: number): Promise<Faq> => {
    const res = await axios.get(`${API_BASE_NAME}/Get_ById_Faq/${faq_id}`);
    const data = res.data.data;
    console.log("data", data)
    return {
        faq_id: data.faq_id,
        question: data.question,
        answer: data.answer,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};

export const updateFaqApi = async (faq_id: number, payload: { question: string; answer: string }) => {
    return axios.put(`${API_BASE_NAME}/Edit_Faq/${faq_id}`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getAllFaq = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE_NAME}/Get_All_Faq`);
    return res.data;
};

export const updateFaqStatusApi = async (faq_id: number, payload: { status: string }): Promise<void> => {
    try {
        await axios.put(`${API_BASE_NAME}/Update_Faq_Status/${faq_id}`, payload, {
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

export const deleteFaqApi = async (faq_id: number): Promise<void> => {
    await axios.delete(`${API_BASE_NAME}/Delete_Faq/${faq_id}`, {
        data: { status: "INACTIVE" }
    });
};