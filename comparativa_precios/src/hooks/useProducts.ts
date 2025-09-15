// hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { ProductWithStats } from '@/types/Product';
import { SheetsProductRepo } from '@/repos/SheetsProductRepo';


export function useProducts(token: string | undefined){
const [items, setItems] = useState<ProductWithStats[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


const repo = token ? new SheetsProductRepo(token) : null;


const refresh = async () => {
if(!repo) return; setLoading(true); setError(null);
try{ setItems(await repo.list()); } catch(e:any){ setError(e.message); }
finally{ setLoading(false); }
};


const add = async (name:string, url?:string, price?:number) => { if(!repo) return; await repo.add(name, url, price); await refresh(); };
const addEntry = async (product_id:string, url:string, price:number) => { if(!repo) return; await repo.addEntry(product_id, url, price); await refresh(); };


useEffect(()=>{ refresh(); }, [token]);


return { items, loading, error, refresh, add, addEntry };
}