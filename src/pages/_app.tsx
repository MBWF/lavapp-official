import React from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/Auth/useAuth";

import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer theme="colored" />
    </AuthProvider>
  );
}
