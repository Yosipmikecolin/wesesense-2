"use client";

import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default Layout;
