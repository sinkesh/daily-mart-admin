export interface Stock {
    stock_id: number;
    product_name: string;
    brand_name: string;
    category_name: string;
    stock_quantity: number;
    reorder_level: string;
    unit_price: number;
    status: "active" | "inactive";
  }
  