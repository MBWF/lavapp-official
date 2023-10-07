/* eslint-disable react-hooks/exhaustive-deps */
import { auth } from "@/firebase/auth";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type AuthContextType = {
  userData: User | null | undefined;
  signIn: (data: LoginProps) => void;
  logout: () => void;
};

type AuthContextProps = {
  children: ReactNode;
};

type LoginProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
  const router = useRouter();
  const [userData] = useAuthState(auth);

  const signIn = useCallback(
    async (data: LoginProps) => {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        router.push("/home");
      } catch (error) {
        console.error(error);
        toast.error("Falha ao tentar fazer o login. Tente novamente.");
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    signOut(auth);
    router.push("/");
  }, [router]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (!user) {
        logout();
        return;
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userData, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
