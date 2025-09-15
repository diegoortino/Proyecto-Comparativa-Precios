// components/AuthForm.tsx
import { useState } from 'react';


export default function AuthForm({onLogin, onRegister, loading, error}:{
onLogin:(e:string,p:string)=>void; onRegister:(e:string,p:string)=>void; loading:boolean; error:string|null;
}){
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
return (
<div className="max-w-sm mx-auto space-y-3">
<input className="border p-2 w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<div className="flex gap-2">
<button disabled={loading} onClick={()=>onLogin(email,password)} className="border px-3 py-2">Login</button>
<button disabled={loading} onClick={()=>onRegister(email,password)} className="border px-3 py-2">Register</button>
</div>
{error && <p className="text-red-600 text-sm">{error}</p>}
</div>
);
}