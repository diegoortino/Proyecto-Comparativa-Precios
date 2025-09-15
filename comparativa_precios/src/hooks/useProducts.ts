import { useEffect, useMemo, useState } from "react";
import type { ProductWithStats } from "@/types/Product";
import { SheetsProductRepo } from "@/repos/SheetsProductRepo";

export function useProducts(token?: string) {
  const repo = useMemo(() => (token ? new SheetsProductRepo(token) : null), [token]);
  const [items, setItems] = useState<ProductWithStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!repo) return;
    setLoading(true); setError(null);
    try { setItems(await repo.list()); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setLoading(false); }
  };

  const add = async (name: string, url?: string, price?: number) => { if (!repo) return; await repo.add(name, url, price); await refresh(); };
  const addEntry = async (product_id: string, url: string, price: number) => { if (!repo) return; await repo.addEntry(product_id, url, price); await refresh(); };

  useEffect(() => { refresh(); }, [repo]);

  return { items, loading, error, refresh, add, addEntry };
}
