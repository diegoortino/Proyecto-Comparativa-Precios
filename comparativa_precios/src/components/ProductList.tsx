// components/ProductList.tsx
import type { ProductWithStats } from '../types/Product';
import { useState } from 'react';


export default function ProductList({items, onAddEntry}:{ items:ProductWithStats[]; onAddEntry:(product_id:string,url:string,price:number)=>void }){
return (
<div className="space-y-4">
{items.map(p => <ProductCard key={p.product_id} p={p} onAddEntry={onAddEntry} />)}
</div>
);
}


function ProductCard({p, onAddEntry}:{p:ProductWithStats; onAddEntry:(product_id:string,url:string,price:number)=>void}){
const [url,setUrl] = useState('');
const [price,setPrice] = useState('');
return (
<div className="border rounded p-3">
<div className="flex items-center justify-between">
<div>
<div className="font-semibold">{p.name}</div>
<div className="text-sm opacity-70">Opciones: {p.stats.count} · Min: {p.stats.min??'-'} · Max: {p.stats.max??'-'} · Prom: {p.stats.avg??'-'}</div>
</div>
<div className="flex gap-2">
<input className="border p-1" placeholder="URL" value={url} onChange={e=>setUrl(e.target.value)} />
<input className="border p-1 w-24" placeholder="Precio" value={price} onChange={e=>setPrice(e.target.value)} />
<button className="border px-2" onClick={()=>{ if(price) onAddEntry(p.product_id,url,Number(price)); }}>+ Variante</button>
</div>
</div>
{p.options.length>0 && (
<table className="w-full text-sm mt-3">
<thead><tr><th className="text-left">URL</th><th className="text-right">Precio</th><th className="text-left">Moneda</th><th className="text-left">Fecha</th></tr></thead>
<tbody>
{p.options.map(o => (
<tr key={o.entry_id}>
<td className="truncate"><a href={o.url} target="_blank" rel="noreferrer" className="underline">{o.url}</a></td>
<td className="text-right">{o.price}</td>
<td>{o.currency}</td>
<td>{new Date(o.created_at).toLocaleString()}</td>
</tr>
))}
</tbody>
</table>
)}
</div>
);
}