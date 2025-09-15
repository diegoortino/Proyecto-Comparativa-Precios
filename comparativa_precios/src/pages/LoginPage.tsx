import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, register, loading, error } = useAuth();
  return <AuthForm onLogin={login} onRegister={register} loading={loading} error={error} />;
}
