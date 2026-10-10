import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "Better Auth এবং MongoDB দিয়ে তৈরি করা একটি সুরক্ষিত লাইভ বাজার দর অ্যাপ্লিকেশন",
};

export default function RootLayout({ children }) {
  return (

    <html lang="bn" data-theme="light" className="bg-white" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-slate-900 min-h-screen flex flex-col`}>
        
        <Suspense fallback={<div className="w-full h-20 bg-slate-100 animate-pulse"></div>}>
          <Navbar />
        </Suspense>
        
        <main className="flex-grow bg-white">
          {children}
        </main>
        
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
