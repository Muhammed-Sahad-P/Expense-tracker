"use client";

import Navbar from "@/components/Navbar";
import Providers from "@/components/Provider";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
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
      <body className="bg-white">
        <Providers>
          <Navbar />
          <div className="flex h-screen pt-16">
            {user && (
              <aside className="hidden md:block w-64 bg-gray-900 text-white">
                <Sidebar />
              </aside>
            )}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
