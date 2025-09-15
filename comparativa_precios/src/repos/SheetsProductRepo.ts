import { ENV } from "@/env";
import type { ProductWithStats } from "@/types/Product";

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

export class SheetsProductRepo {
  private base = ENV.API_BASE;
  constructor(private token: string) {}

  private async jsonFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const r = await fetch(`${this.base}?path=${path}`, { ...init, headers: { ...authHeader(this.token), ...(init?.headers || {}) } });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "Request failed");
    return j.data as T;
    }

  list() {
    return this.jsonFetch<ProductWithStats[]>("products");
  }

  add(name: string, url?: string, price?: number, currency = "ARS") {
    return this.jsonFetch("products/add", { method: "POST", body: JSON.stringify({ name, url, price, currency }) });
  }

  addEntry(product_id: string, url: string, price: number, currency = "ARS") {
    return this.jsonFetch("products/entry", { method: "POST", body: JSON.stringify({ product_id, url, price, currency }) });
  }
}
