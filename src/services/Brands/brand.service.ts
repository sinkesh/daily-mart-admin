import axios from "axios";
import { BrandTypes } from "./brand.types";
import { environment } from "../../environments/environment";
const API_BASE_NAME = `${environment.apiBaseUrl}`

// ✅ Get All Brand
export const getAllBrandApi = async (): Promise<{ data: any[] }> => {
    const res = await axios.get(`${API_BASE_NAME}/Get_All_Brand`);
    return res.data;
};

// ✅ Create Brand
export const createBrandApi = async (brand_name: string, description: string, imageFile: File): Promise<BrandTypes> => {
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    formData.append("description", description);
    formData.append("brand_logo", imageFile);

    const res = await axios.post(`${API_BASE_NAME}/Create_Brand`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};

// ✅ Delete Brand
export const deleteBrandApi = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_NAME}/Delete_Brand/${id}`, {
        data: { status: "INACTIVE" }
    });
};

// ✅ Get ById Brand
export const getByIdBrandApi = async (id: number): Promise<BrandTypes> => {
    const res = await axios.get(`${API_BASE_NAME}/Get_ById_Brand/${id}`);
    const data = res.data.data;
    return {
        brand_id: data.brand_id,
        brand_name: data.brand_name,
        description: data.description,
        brand_logo: data.brand_logo,
        status: data.status.toLowerCase() === "active" ? "active" : "inactive",
    };
};


// ✅ Update Brand Status
export const updateBrandStatusApi = async (brand_id: number, payload: { status: string }): Promise<void> => {
    try {
        await axios.put(`${API_BASE_NAME}/Update_Brand_Status/${brand_id}`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("✅ status updated successfully!");
    } catch (error: any) {
        console.error("❌ Error updating status:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Update Brand
export const updateBrandApi = async (id: number, formData: FormData): Promise<void> => {
    try {
        await axios.put(`${API_BASE_NAME}/Edit_Brand/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Category updated successfully!");
    } catch (error: any) {
        console.error("Error updating category:", error.response?.data || error.message);
    }
};