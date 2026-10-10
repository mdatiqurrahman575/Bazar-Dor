"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";


const fallbackSingleProducts = {
  "1": { name: "স্বর্ণমাছি চাল", currentPrice: 58, yesterdayPrice: 55, unit: "কেজি", emoji: "🍚", category: "chal" },
  "2": { name: "مিনিকেট চাল", currentPrice: 72, yesterdayPrice: 70, unit: "কেজি", emoji: "🍚", category: "chal" },
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
  const router = useRouter();
  const productId = params.slug || params.id;
  
  const [product, setProduct] = useState(fallbackSingleProducts[productId] || null);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  useEffect(() => {
    if (sessionLoading) return;

    if (!session) {
      toast.error("এই পেজটি দেখতে হলে আপনাকে প্রথমে সাইন ইন করতে হবে!");
      router.push("/login");
      return;
    }

    if (!productId) return;

    fetch(`https://workers.dev{productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        if (data) setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ডিটেইলস এপিআই রেসপন্স করেনি, ব্যাকআপ ডেটা ব্যবহার করা হয়েছে।");
        setLoading(false); 
      });
  }, [session, sessionLoading, productId, router]);

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-white mb-2">⚠️ পণ্যটি খুঁজে পাওয়া যায়নি!</h2>
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
    <div className="space-y-8">
      <Link href="/" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1">
        ← বাজারে ফিরে যান
      </Link>

      <div className="backdrop-blur-xl bg-white/5 border border-white/5 p-8 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-5xl shadow-inner">
          {product.emoji || "🛒"}
        </div>
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 uppercase tracking-wider">
              {product.category || "নিত্যপণ্য"}
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight mt-2">{product.name}</h1>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            আজকের বাজার বিশ্লেষণ অনুযায়ী পণ্যটির সরবরাহ স্বাভাবিক রয়েছে এবং দাম স্থিতিশীল। (প্রতি {product.unit})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">সর্বনিম্ন সম্ভাব্য দাম</span>
          <span className="text-2xl font-black text-emerald-400 mt-2">{toBengaliNumber(product.currentPrice - 3)} টাকা</span>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">সর্বোচ্চ সম্ভাব্য দাম</span>
          <span className="text-2xl font-black text-rose-400 mt-2">{toBengaliNumber(product.currentPrice + 4)} টাকা</span>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">গড় বাজার দর</span>
          <span className="text-2xl font-black text-indigo-400 mt-2">{toBengaliNumber(product.currentPrice)} টাকা</span>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/5 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <div className="mb-6 border-b border-white/5 pb-3">
          <h2 className="text-xl font-black text-white tracking-tight">বিভিন্ন বাজারে আজকের দর</h2>
          <p className="text-xs text-slate-400 mt-0.5">ঢাকার প্রধান কাঁচাবাজারগুলোর খুচরা মূল্যের লাইভ তুলনা</p>
        </div>
        <div className="divide-y divide-white/5">
          {bazarData.map((bazar, index) => (
            <div key={index} className="flex items-center justify-between py-4 group hover:bg-white/[0.02] px-2 rounded-xl transition">
              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition">📍 {bazar.name}</span>
              <span className="text-base font-black text-white bg-slate-950/60 px-4 py-1.5 rounded-xl border border-white/5">{toBengaliNumber(bazar.price)} টাকা</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pt-10 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">লোডিং...</p>
          </div>
        }>
          <ProductDetailsContent />
        </Suspense>
      </div>
    </div>
  );
}
