"use client";

import Providers from "@/components/ui/Provider";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <html lang="en">
      <body className="bg-[#3A4046]">
        <Providers>
          <div className="flex h-screen">
            {user && (
              <aside className="hidden lg:block w-64 fixed top-0 left-0 h-full">
                <Sidebar />
              </aside>
            )}
            <main className={`flex-1 p-6 overflow-auto ${user ? "lg:ml-64" : ""}`}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
