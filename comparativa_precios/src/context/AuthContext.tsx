import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SheetsAuthRepo } from "@/repos/SheetsAuthRepo";
import type { Session } from "@/types/Auth";

type Ctx = {
  session: Session | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<Ctx | undefined>(undefined);
const KEY = "app:session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const repo = useMemo(() => new SheetsAuthRepo(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try { setSession(JSON.parse(raw)); } catch { localStorage.removeItem(KEY); }
    }
  }, []);

  useEffect(() => {
    if (session) localStorage.setItem(KEY, JSON.stringify(session));
    else localStorage.removeItem(KEY);
  }, [session]);

  const login = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try { const s = await repo.login(email, password); setSession(s); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setLoading(false); }
  };

  const register = async (email: string, password: string) => {
    setLoading(true); setError(null);
    try { await repo.register(email, password); const s = await repo.login(email, password); setSession(s); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setLoading(false); }
  };

  const logout = () => setSession(null);

  return (
    <AuthContext.Provider value={{ session, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
