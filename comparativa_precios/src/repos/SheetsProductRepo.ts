// repos/SheetsProductRepo.ts
import type { ProductWithStats } from '../types/Product';


const BASE = 'https://script.google.com/macros/s/AKfycbwUzVoFQi7rIvjgOxtzADh7NJig-KdeCabfcer4qXM7ImCrBdBc6Pjq-Dyb6jFNvSU/exec';
function authHeader(token:string){ return { 'Authorization': `Bearer ${token}` }; }


export class SheetsProductRepo {
private token: string;
constructor(token: string){
	this.token = token;
}
async list(): Promise<ProductWithStats[]>{
const r = await fetch(`${BASE}?path=products`, { headers: authHeader(this.token) });
const j = await r.json(); if(!j.ok) throw new Error(j.error); return j.data;
}
async add(name:string, url?:string, price?:number, currency='ARS'){
const r = await fetch(`${BASE}?path=products/add`, { method:'POST', headers:{...authHeader(this.token), 'Content-Type':'application/json'}, body: JSON.stringify({name, url, price, currency}) });
const j = await r.json(); if(!j.ok) throw new Error(j.error); return j.data;
}
async addEntry(product_id:string, url:string, price:number, currency='ARS'){
const r = await fetch(`${BASE}?path=products/entry`, { method:'POST', headers:{...authHeader(this.token), 'Content-Type':'application/json'}, body: JSON.stringify({product_id, url, price, currency}) });
const j = await r.json(); if(!j.ok) throw new Error(j.error); return j.data;
}
}