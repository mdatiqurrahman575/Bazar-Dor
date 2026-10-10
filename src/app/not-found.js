"use client";

import Link from "next/link";

export default function NotFound() {
  return (
  
    <div className="min-h-[75vh] bg-white flex flex-col items-center justify-center px-4 text-center text-slate-900">
      <div className="space-y-6 max-w-md">

        <div className="text-8xl select-none animate-bounce duration-1000">
          🛒🔍
        </div>
        

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            পেজটি খুঁজে পাওয়া যায়নি!
          </h1>
          <p className="text-sm font-medium text-slate-500">
            দুঃখিত, আপনি যে লিংক বা বাজার দর ক্যাটাগরিটি খুঁজছেন—তা এই মুহূর্তে আমাদের তালিকায় নেই অথবা ভুল ঠিকানায় প্রবেশ করেছেন।
          </p>
        </div>


        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-indigo-500/10 active:scale-[0.98] text-sm"
          >
            হোম পেজে ফিরে যান 🏠
          </Link>
        </div>

      </div>
    </div>
  );
}
