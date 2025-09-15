import axios from "axios";
import { SubCategory } from "./SubCategory.types";
const API_BASE = "http://localhost:8000/api/v1";

// ✅ Create Sub Category
export const createSubCategory = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_BASE}/Create_Sub_Category`, formData, {
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

// ✅ Get ById Sub Catgeory 
export const getSubCategoryById = async (id: number): Promise<SubCategory> => {
  const res = await axios.get(`${API_BASE}/Get_ById_Sub_Category/${id}`);
  const data = res.data.data; // backend returns { code, message, data }
  return {
    id: data.sub_category_id,
    category_name: data.category_name,
    sub_category_name: data.sub_category_name,
    sub_category_image: data.sub_category_image,
    status: data.status.toLowerCase() === "active" ? "active" : "inactive",
  };
};

// ✅ Update Sub Category
export const updateSubCategoryApi = async (id: number, formData: FormData): Promise<void> => {
  try {
    await axios.put(`${API_BASE}/Edit_Sub_Category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Category updated successfully!");
  } catch (error: any) {
    console.error("Error updating category:", error.response?.data || error.message);
  }
};

// ✅ Get All Categories
export const getSubCategories = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE}/Get_All_Sub_Category`);
  return res.data;
};

// ✅ Update Sub Category Status
export const updateSubCategoryStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE}/Update_Sub_Category_Status/${id}`, payload, {
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
export const deleteSubCategoryApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/Delete_Sub_Category/${id}`, {
    data: { status: "INACTIVE" }
  });
};