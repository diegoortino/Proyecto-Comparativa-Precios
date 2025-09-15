export type Product = { product_id: string; user_id: string; name: string; created_at: string };
export type ProductEntry = { entry_id: string; product_id: string; url: string; price: number; currency: string; created_at: string };
export type ProductWithStats = Product & { options: ProductEntry[]; stats: { count:number; min:number|null; max:number|null; avg:number|null } };
