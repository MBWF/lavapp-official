import { AuthProvider } from "@/contexts/Auth/useAuth";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";

import { CreateOrderProvider } from "@/contexts/Order/useCreateOrder";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CreateOrderProvider>
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </CreateOrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
