import { ENV } from "@/env";
import type { Session } from "@/types/Auth";

export class SheetsAuthRepo {
  private base = ENV.API_BASE;

  private async jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const r = await fetch(url, { ...init, headers: { "Content-Type": "application/json", ...(init?.headers || {}) }});
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "Request failed");
    return j.data as T;
  }

  register(email: string, password: string) {
    return this.jsonFetch<Pick<Session, "user_id"|"email">>(`${this.base}?path=auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  login(email: string, password: string) {
    return this.jsonFetch<Session>(`${this.base}?path=auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }
}
