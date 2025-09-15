// hooks/useAuth.ts
import { useState } from 'react';
import { SheetsAuthRepo } from '@/repos/SheetsAuthRepo';
import { Session } from '@/types/Auth';


export function useAuth(){
const repo = new SheetsAuthRepo();
const [session, setSession] = useState<Session | null>(null);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);


const login = async (email:string, password:string) => {
try{ setLoading(true); setError(null); const s = await repo.login(email,password); setSession(s);}catch(e:any){ setError(e.message);} finally{ setLoading(false);} };
const register = async (email:string, password:string) => {
try{ setLoading(true); setError(null); await repo.register(email,password); await login(email,password);}catch(e:any){ setError(e.message);} finally{ setLoading(false);} };
const logout = () => setSession(null);


return { session, login, register, logout, loading, error };
}