import axios from "axios";
import { SubCategory } from "./SubCategory.types";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

export const createSubCategory = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE_NAME}/Create_Sub_Category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
};

export const getSubCategoryById = async (id: number): Promise<SubCategory> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_ById_Sub_Category/${id}`);
  const data = res.data.data;
  return {
    id: data.sub_category_id,
    category_name: data.category_name,
    sub_category_name: data.sub_category_name,
    sub_category_image: data.sub_category_image,
    status: data.status.toLowerCase() === "active" ? "active" : "inactive",
  };
};

export const updateSubCategoryApi = async (id: number, formData: FormData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Edit_Sub_Category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Category updated successfully!");
  } catch (error: any) {
    console.error("Error updating category:", error.response?.data || error.message);
  }
};

export const getSubCategories = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_Sub_Category`);
  return res.data;
};

export const updateSubCategoryStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Update_Sub_Category_Status/${id}`, payload, {
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

export const deleteSubCategoryApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_NAME}/Delete_Sub_Category/${id}`, {
    data: { status: "INACTIVE" }
  });
};