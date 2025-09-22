export interface BrandTypes {
    brand_id: number;
    brand_name: string;
    description: string;
    brand_logo?: string;
    status: "active" | "inactive";
}