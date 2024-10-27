import { useAuthStore } from "@/stores/auth";
import { useLS } from "../service/useLS";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export const useAuth = () => {
  const { get, exist, ls } = useLS();
  const auth = useAuthStore();

  const authMe = async () => {
    try {
      if (exist("user_id")) {
        auth.userId = ls.getItem("user_id") as string;
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const logout = async () => {
    await auth.clearUser();
  };

  const checkIsAuth = async () => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            auth.setUser(user);
            localStorage.setItem("user_id", user.uid);
        }
    });
  };

  return {
    authMe,
    logout,
    checkIsAuth
  };
};
