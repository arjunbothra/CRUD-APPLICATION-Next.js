import type { Metadata } from "next";
import {  Inter, Montserrat } from "next/font/google";
import "./globals.css";
import QueryProvider from "./components/QueryProvider";

const inter = Inter({ subsets:["latin"] });
const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CRUD-Application",
  description: "Create, Read, Update, Delete",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} bg-gradient-to-r from-black to-[#212529]`} 
      >
        <main className="min-h-screen pb-24 ">
        <QueryProvider>
        {children}
        </QueryProvider>
        </main>
         <footer className="relative  py-12 ">
          <div className="container mx-auto px-4 text-center text-white text-gray-600">
            <p>Made By Arjun Bothra</p>
          </div>
        </footer> 
      </body>
    </html>
  );
}
