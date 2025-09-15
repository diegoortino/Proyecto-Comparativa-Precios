// App.tsx (wire básico)
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import type { Session } from './types/Auth';


export default function App(){
const [session, setSession] = useState<Session | null>(null);
return (
<div className="p-4">
{!session ? (
<LoginPage onLogged={()=>{ /* aquí podrías levantar session desde useAuth (lifting state) o usar context */ }} />
) : (
<DashboardPage token={session.token} />
)}
</div>
);
}