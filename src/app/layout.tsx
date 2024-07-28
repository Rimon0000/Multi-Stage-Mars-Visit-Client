import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi-Stage Mars Visit App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-2 bg-slate-800 text-white text-center font-bold text-xl flex items-center justify-center">
                  <h1 className="truncate p-1">Nogorful</h1>
                </div>
                <div className="col-span-10 h-full">
                    <Topbar/>
                </div>
            </div>
            <hr />
            <div className="grid grid-cols-12">
                <Sidebar></Sidebar>
                <div className="col-span-10 h-full p-5">
                {children}
                <Toaster />
                </div>
            </div>
        </div>
        </Providers>
      </body>
    </html>
  );
}
