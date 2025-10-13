import axios from "axios";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

export const getAllUser = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_User`);
  return res.data;
};

export const getAllActiveUser = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_Active_User`);
  return res.data;
};

export const updateUserStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Update_User_Status/${id}`, payload, {
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