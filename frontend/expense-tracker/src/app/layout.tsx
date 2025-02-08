"use client";

import Providers from "@/components/ui/Provider";
import "./globals.css";
import Sidebar from "@/components/ui/Sidebar/Sidebar";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <html lang="en">
      <body className="bg-white overflow-hidden">
        <Providers>
          <div className="flex h-screen relative">
            {user && (
              <>
                <button
                  className="fixed top-4 left-4 text-black lg:hidden z-50 p-2 bg-gray-200 rounded-md shadow-md"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu size={24} />
                </button>

                {sidebarOpen && (
                  <div
                    className="fixed inset-0 bg-black/20 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
                )}

                <aside
                  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 lg:relative lg:z-0`}
                >
                  <Sidebar />
                </aside>
              </>
            )}

            <main
              className={`flex-1 p-6 overflow-auto w-full
                ${user ? "lg:ml-28" : ""}`}
            >
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}