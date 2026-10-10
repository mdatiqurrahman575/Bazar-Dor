"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";


const fallbackCategoryProducts = [
  { id: 1, name: "স্বর্ণমাছি চাল", currentPrice: 58, yesterdayPrice: 55, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 2, name: "মিনিকেট চাল", currentPrice: 72, yesterdayPrice: 70, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 3, name: "নাজিরশাইল চাল", currentPrice: 85, yesterdayPrice: 85, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 4, name: "মসুর ডাল", currentPrice: 140, yesterdayPrice: 145, unit: "কেজি", emoji: "🫘", category: "dal" },
  { id: 5, name: "সয়াবিন তেল", currentPrice: 165, yesterdayPrice: 160, unit: "লিটার", emoji: "🫙", category: "tel" },
  { id: 6, name: "দেশী পেঁয়াজ", currentPrice: 110, yesterdayPrice: 120, unit: "কেজি", emoji: "🧅", category: "sobji" },
  { id: 7, name: "দেশী আলু", currentPrice: 55, yesterdayPrice: 50, unit: "কেজি", emoji: "🥔", category: "sobji" },
  { id: 8, name: "ইলিশ মাছ", currentPrice: 1600, yesterdayPrice: 1550, unit: "কেজি", emoji: "🐟", category: "mach" },
  { id: 10, name: "ব্রয়লার মুরগি", currentPrice: 185, yesterdayPrice: 190, unit: "কেজি", emoji: "🍗", category: "mangso" },
  { id: 11, name: "দেশী রসুন", currentPrice: 220, yesterdayPrice: 210, unit: "কেজি", emoji: "🧄", category: "mosla" },
];

const categoryMeta = {
  chal: { title: "চাল", icon: "🍚" },
  dal: { title: "ডাল", icon: "🫘" },
  tel: { title: "তেল", icon: "🫙" },
  sobji: { title: "সবজি", icon: "🥔" },
  mach: { title: "মাছ", icon: "🐟" },
  mangso: { title: "মাংস", icon: "🍗" },
  mosla: { title: "মসলা", icon: "🌶️" },
};


function CategoryPageContent() {
  const { slug } = useParams();
  const defaultFiltered = fallbackCategoryProducts.filter(p => p.category === slug);
  
  const [products, setProducts] = useState(defaultFiltered);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    fetch(`https://workers.dev{slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Category not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [slug]);

  const currentCategory = categoryMeta[slug];

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.currentPrice - b.currentPrice;
    if (sortOption === "highToLow") return b.currentPrice - a.currentPrice;
    return 0;
  });

  const SkeletonCard = () => (
    <div className="w-full h-44 bg-slate-100 rounded-2xl p-6 border border-slate-200 space-y-4 animate-pulse">
      <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
    </div>
  );

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center text-slate-900">
        <h2 className="text-2xl font-black mb-2">ক্যাটাগরি খুঁজে পাওয়া যায়নি!</h2>
        <Link href="/" className="btn bg-indigo-600 text-white rounded-xl mt-4">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
            <span>{currentCategory.icon}</span>
            <span>{currentCategory.title} বিভাগ</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-sm bg-white border border-slate-300 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && products.length === 0 ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />) : 
          sortedProducts.map((prod) => {
            const changePercent = ((prod.currentPrice - prod.yesterdayPrice) / prod.yesterdayPrice) * 100;
            const isUp = changePercent > 0;
            const isDown = changePercent < 0;

            return (
              <Link
                key={prod.id}
                href={`/product/${prod.id}`}

                className="group bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col justify-between p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-slate-300 hover:shadow-indigo-500/10"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                    {prod.emoji || "🛒"}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base tracking-tight group-hover:text-indigo-600 transition whitespace-nowrap overflow-hidden text-ellipsis">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">প্রতি {prod.unit}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">আজকের দাম</span>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-black text-slate-900">
                      {toBengaliNumber(prod.currentPrice)} টাকা
                    </span>
                    
                    {isUp && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
                        ▲ {toBengaliNumber(changePercent.toFixed(1))}%
                      </span>
                    )}
                    {isDown && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                        ▼ {toBengaliNumber(Math.abs(changePercent).toFixed(1))}%
                      </span>
                    )}
                    {!isUp && !isDown && (
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500">
                        — ০.০%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}


export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-white pb-24 px-4 pt-10 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">বিভাগের পণ্য লোড হচ্ছে...</p>
          </div>
        }>
          <CategoryPageContent />
        </Suspense>
      </div>
    </div>
  );
}
