import axios from "axios";
// import { ProductTypes } from "./Product.types";
const API_BASE = "http://localhost:8000/api/v1";

// ✅ Get All Product
export const getAllProduct = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE}/Get_All_Product`);
  return res.data;
};

// ✅ Add Product
export const createProduct = (formData: FormData) => {
  return axios.post(`${API_BASE}/Create_Product`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const getByIdProduct = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE}/Get_ById_Product/${id}`);
    return response.data; // assume API returns { data: {...product} }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};


// ✅ Update Category Status
export const updateProductStatusApi = async (id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE}/Update_Product_Status/${id}`, payload, {
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

// ✅ Update Category
// export const updateProductApi = async (id: number, formData: FormData): Promise<void> => {
//   try {
//     await axios.put(`${API_BASE}/Edit_Product/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     console.log("updated successfully!");
//   } catch (error: any) {
//     console.error("Error updating:", error.response?.data || error.message);
//   }
// };

export const updateProductApi = async (id: string, formData: FormData) => { // number se string
  try {
    const response = await axios.put(`${API_BASE}/Edit_Product/${id}`, formData, {
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


// // ✅ Delete Category
// export const deleteCategoryApi = async (id: number): Promise<void> => {
//   await axios.delete(`${API_BASE}/Delete_Category/${id}`, {
//     data: { status: "INACTIVE" }
//   });
// };