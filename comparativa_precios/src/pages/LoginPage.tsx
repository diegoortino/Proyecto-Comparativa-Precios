// pages/LoginPage.tsx
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';


export default function LoginPage({onLogged}:{onLogged:()=>void}){
const {login, register, loading, error, session} = useAuth();
if (session) { onLogged(); }
return <AuthForm onLogin={login} onRegister={register} loading={loading} error={error} />;
}