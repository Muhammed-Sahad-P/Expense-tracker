import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  user: { username: string; email: string } | null;
  token: string | null;
  setUser: (user: AuthState["user"], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: Cookies.get("token") || null,

  setUser: (user, token) => {
    Cookies.set("token", token, { path: "/", sameSite: "Lax" });
    set({ user, token });
  },

  logout: () => {
    Cookies.remove("token", { path: "/" });
    set({ user: null, token: null });
    console.log("Token removed:", Cookies.get("token"));
  },
}));
