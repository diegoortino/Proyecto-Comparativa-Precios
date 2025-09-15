// components/ProductForm.tsx
import { useState } from 'react';


export default function ProductForm({onSubmit}:{ onSubmit:(name:string,url?:string,price?:number)=>void }){
const [name,setName] = useState('');
const [url,setUrl] = useState('');
const [price,setPrice] = useState<string>('');
return (
<div className="space-y-2">
<input className="border p-2 w-full" placeholder="Nombre del producto" value={name} onChange={e=>setName(e.target.value)} />
<input className="border p-2 w-full" placeholder="URL del producto" value={url} onChange={e=>setUrl(e.target.value)} />
<input className="border p-2 w-full" placeholder="Precio" value={price} onChange={e=>setPrice(e.target.value)} />
<button className="border px-3 py-2" onClick={()=>onSubmit(name, url || undefined, price?Number(price):undefined)}>Agregar</button>
</div>
);
}