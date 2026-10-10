"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { toBengaliNumber } from "@/lib/utils";
import Link from "next/link";

const fallbackSingleProducts = {
  "1": { name: "স্বর্ণমাছি চাল", currentPrice: 58, yesterdayPrice: 55, unit: "কেজি", emoji: "🍚", category: "chal" },
  "2": { name: "মিনিকেট চাল", currentPrice: 72, yesterdayPrice: 70, unit: "কেজি", emoji: "🍚", category: "chal" },
  "3": { name: "নাজিরশাইল চাল", currentPrice: 85, yesterdayPrice: 85, unit: "কেজি", emoji: "🍚", category: "chal" },
  "4": { name: "মসুর ডাল (উন্নত)", currentPrice: 140, yesterdayPrice: 145, unit: "কেজি", emoji: "🫘", category: "dal" },
  "5": { name: "সয়াবিন তেল", currentPrice: 165, yesterdayPrice: 160, unit: "লিটার", emoji: "🫙", category: "tel" },
  "6": { name: "দেশী পেঁয়াজ", currentPrice: 110, yesterdayPrice: 120, unit: "কেজি", emoji: "🧅", category: "sobji" },
  "7": { name: "দেশী আলু", currentPrice: 55, yesterdayPrice: 50, unit: "কেজি", emoji: "🥔", category: "sobji" },
  "8": { name: "ইলিশ মাছ (১ কেজি)", currentPrice: 1600, yesterdayPrice: 1550, unit: "কেজি", emoji: "🐟", category: "mach" },
  "9": { name: "রুই মাছ", currentPrice: 380, yesterdayPrice: 400, unit: "কেজি", emoji: "🐟", category: "mach" },
  "10": { name: "ব্রয়লার মুরগি", currentPrice: 185, yesterdayPrice: 190, unit: "কেজি", emoji: "🍗", category: "mangso" },
  "11": { name: "দেশী রসুন", currentPrice: 220, yesterdayPrice: 210, unit: "কেজি", emoji: "🧄", category: "mosla" },
  "12": { name: "শুকনা মরিচ", currentPrice: 420, yesterdayPrice: 390, unit: "কেজি", emoji: "🌶️", category: "mosla" }
};

function ProductDetailsContent() {
  const params = useParams();
  const productId = params.slug || params.id;
  
  const [product, setProduct] = useState(fallbackSingleProducts[productId] || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    fetch(`https://workers.dev{productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading && !product) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-900 mb-2">⚠️ পণ্যটি খুঁজে পাওয়া যায়নি!</h2>
        <Link href="/" className="btn bg-indigo-600 text-white rounded-xl mt-4">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  const bazarData = [
    { name: "কারওয়ান বাজার", price: product.currentPrice - 2 },
    { name: "মিরপুর ১১ নম্বর বাজার", price: product.currentPrice + 3 },
    { name: "যাত্রাবাড়ী কাঁচাবাজার", price: product.currentPrice - 1 },
    { name: "মোহাম্মদপুর টাউন হল বাজার", price: product.currentPrice + 1 }
  ];

  return (
    <div className="space-y-8 text-slate-900">
      <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1">
        ← বাজারে ফিরে যান
      </Link>

      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-5xl">
          {product.emoji || "🛒"}
        </div>
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 uppercase tracking-wider">
              {product.category || "নিত্যপণ্য"}
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">{product.name}</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            আজকের বাজার বিশ্লেষণ অনুযায়ী পণ্যটির সরবরাহ স্বাভাবিক রয়েছে। (প্রতি {product.unit})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">সর্বনিম্ন সম্ভাব্য দাম</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">{toBengaliNumber(product.currentPrice - 3)} টাকা</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">সর্বোচ্চ সম্ভাব্য দাম</span>
          <div className="text-2xl font-black text-rose-600 mt-2">{toBengaliNumber(product.currentPrice + 4)} টাকা</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">গড় বাজার দর</span>
          <div className="text-2xl font-black text-indigo-600 mt-2">{toBengaliNumber(product.currentPrice)} টাকা</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="mb-6 border-b border-slate-100 pb-3">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">বিভিন্ন বাজারে আজকের দর</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {bazarData.map((bazar, index) => (
            <div key={index} className="flex items-center justify-between py-4">
              <span className="text-sm font-bold text-slate-700">📍 {bazar.name}</span>
              <span className="text-base font-black text-slate-900 bg-slate-50 px-4 py-1.5 rounded-xl border border-slate-200">{toBengaliNumber(bazar.price)} টাকা</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<div className="text-center py-20 text-slate-500">লোডিং...</div>}>
          <ProductDetailsContent />
        </Suspense>
      </div>
    </div>
  );
}
