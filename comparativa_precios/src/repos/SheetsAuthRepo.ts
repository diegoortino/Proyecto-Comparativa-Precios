// repos/SheetsAuthRepo.ts
import type { Session } from '../types/Auth';
const BASE = 'https://script.google.com/macros/s/AKfycbwUzVoFQi7rIvjgOxtzADh7NJig-KdeCabfcer4qXM7ImCrBdBc6Pjq-Dyb6jFNvSU/exec';


export class SheetsAuthRepo {
async register(email: string, password: string){
const r = await fetch(`${BASE}?path=auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
const j = await r.json(); if(!j.ok) throw new Error(j.error); return j.data;
}
async login(email: string, password: string): Promise<Session>{
const r = await fetch(`${BASE}?path=auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
const j = await r.json(); if(!j.ok) throw new Error(j.error); return j.data;
}
}