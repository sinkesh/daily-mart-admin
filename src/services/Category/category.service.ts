import axios from "axios";
import { Category } from "./category.types";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

export const getCategories = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_Category`);
  return res.data;
};

export const createCategory = async (name: string, imageFile: File): Promise<Category> => {
  const formData = new FormData();
  formData.append("category_name", name);
  formData.append("category_image", imageFile);

  const res = await axios.post(`${API_BASE_NAME}/Create_Category`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // backend response
};

export const deleteCategoryApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_NAME}/Delete_Category/${id}`, {
    data: { status: "INACTIVE" }
  });
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_ById_Category/${id}`);
  const data = res.data.data;
  return {
    id: data.category_id,
    name: data.category_name,
    image: data.category_image,
    status: data.status.toLowerCase() === "active" ? "active" : "inactive",
  };
};

export const updateCategoryStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Update_Category_Status/${id}`, payload, {
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

export const updateCategoryApi = async (id: number, formData: FormData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Edit_Category/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Category updated successfully!");
  } catch (error: any) {
    console.error("Error updating category:", error.response?.data || error.message);
  }
};