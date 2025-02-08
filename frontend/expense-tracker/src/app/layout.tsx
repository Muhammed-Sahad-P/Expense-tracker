import { Metadata } from "next";
import Providers from "@/components/ui/Provider";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout/ClientLayout";

export const metadata: Metadata = {
  title: "FinTrack",
  description: "Track your expenses with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white overflow-hidden">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
