import axios from "axios";
import { Faq } from "./Faq.types";
const API_BASE = "http://localhost:8000/api/v1";

// ✅ Create Sub Faq
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

// ✅ Get ById Sub Catgeory 
export const getFaqById = async (id: number): Promise<Faq> => {
    const res = await axios.get(`${API_BASE}/Get_ById_Faq/${id}`);
    const data = res.data.data; // backend returns { code, message, data }
    return {
        faq_id: data.faq_id,
        question: data.question,
        answer: data.answer,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};

// // ✅ Update Sub Faq
// export const updateFaqApi = async (id: number, formData: FormData): Promise<void> => {
//   try {
//     await axios.put(`${API_BASE}/Edit_Faq/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("Faq updated successfully!");
//   } catch (error: any) {
//     console.error("Error updating faq:", error.response?.data || error.message);
//   }
// };

// ✅ Get All Categories
export const getAllFaq = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE}/Get_All_Faq`);
    return res.data;
};

// ✅ Update Sub Faq Status
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

// ✅ Delete Sub Faq
export const deleteFaqApi = async (faq_id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/Delete_Faq/${faq_id}`, {
        data: { status: "INACTIVE" }
    });
};