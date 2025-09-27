import axios from "axios";
import { BannerTypes } from "./Banner.types";
const API_BASE_NAME = "http://localhost:8000/api/v1";

export const getAllBanner = async (): Promise<{ data: any[] }> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_All_Banner`);
  return res.data;
};

export const createBanner = async (name: string, imageFile: File): Promise<BannerTypes> => {
  const formData = new FormData();
  formData.append("banner_name", name);
  formData.append("banner_image", imageFile);

  const res = await axios.post(`${API_BASE_NAME}/Create_Banner`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteBannerApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_NAME}/Delete_Banner/${id}`, {
    data: { status: "INACTIVE" }
  });
};

export const getBannerById = async (id: number): Promise<BannerTypes> => {
  const res = await axios.get(`${API_BASE_NAME}/Get_ById_Banner/${id}`);
  const data = res.data.data;
  return {
    banner_id: data.banner_id,
    banner_name: data.banner_name,
    banner_image: data.banner_image,
    status: data.status.toLowerCase() === "active" ? "active" : "inactive",
  };
};

export const updateBannerStatusApi = async (banner_id: number, payload: { status: string }): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Update_Banner_Status/${banner_id}`, payload, {
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

export const updateBannerApi = async (id: number, formData: FormData): Promise<void> => {
  try {
    await axios.put(`${API_BASE_NAME}/Edit_Banner/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("updated successfully!");
  } catch (error: any) {
    console.error("Error updating Banner:", error.response?.data || error.message);
  }
};