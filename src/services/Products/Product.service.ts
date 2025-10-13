import axios from "axios";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

export const getAllProduct = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_Product`);
  return res.data;
};

export const createProduct = (formData: FormData) => {
  return axios.post(`${API_BASE_NAME}/Create_Product`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getByIdProduct = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_NAME}/Get_ById_Product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const updateProductStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Update_Product_Status/${id}`, payload, {
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

export const updateProductApi = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(`${API_BASE_NAME}/Edit_Product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// export const deleteCategoryApi = async (id: number): Promise<void> => {
//   await axios.delete(`${API_BASE_NAME}/Delete_Category/${id}`, {
//     data: { status: "INACTIVE" }
//   });
// };