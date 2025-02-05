import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  setUser: (user: AuthState["user"], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
  token: Cookies.get("token") || null,

  setUser: (user, token) => {
    Cookies.set("token", token, { path: "/", sameSite: "Lax" });
    Cookies.set("user", JSON.stringify(user), { path: "/", sameSite: "Lax" });
    set({ user, token });
  },

  logout: () => {
    Cookies.remove("token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    set({ user: null, token: null });
  },
}));
