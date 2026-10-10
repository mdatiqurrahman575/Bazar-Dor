"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toBengaliNumber, getBengaliDate } from "@/lib/utils"; // ◄utils থেকে তারিখের ফাংশন আনা হলো
import Image from "next/image";

const fallbackFullProducts = [
  { id: 1, name: "স্বর্ণমাছি চাল", currentPrice: 58, yesterdayPrice: 55, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 2, name: "মিনিকেট চাল", currentPrice: 72, yesterdayPrice: 70, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 3, name: "নাজিরশাইল চাল", currentPrice: 85, yesterdayPrice: 85, unit: "কেজি", emoji: "🍚", category: "chal" },
  { id: 4, name: "মসুর ডাল (উন্নত)", currentPrice: 140, yesterdayPrice: 145, unit: "কেজি", emoji: "🫘", category: "dal" },
  { id: 5, name: "সয়াবিন তেল", currentPrice: 165, yesterdayPrice: 160, unit: "লিটার", emoji: "🫙", category: "tel" },
  { id: 6, name: "দেশী পেঁয়াজ", currentPrice: 110, yesterdayPrice: 120, unit: "কেজি", emoji: "🧅", category: "sobji" },
  { id: 7, name: "দেশী আলু", currentPrice: 55, yesterdayPrice: 50, unit: "কেজি", emoji: "🥔", category: "sobji" },
  { id: 8, name: "ইলিশ মাছ (১ কেজি)", currentPrice: 1600, yesterdayPrice: 1550, unit: "কেজি", emoji: "🐟", category: "mach" },
  { id: 10, name: "ব্রয়লার মুরগি", currentPrice: 185, yesterdayPrice: 190, unit: "কেজি", emoji: "🍗", category: "mangso" },
  { id: 11, name: "দেশী রসুন", currentPrice: 220, yesterdayPrice: 210, unit: "কেজি", emoji: "🧄", category: "mosla" },
  { id: 12, name: "শুকনা মরিচ", currentPrice: 420, yesterdayPrice: 390, unit: "কেজি", emoji: "🌶️", category: "mosla" }
];

export default function HomePage() {
  const [products, setProducts] = useState(fallbackFullProducts);
  const [loading, setLoading] = useState(true);
  const [bengaliDate, setBengaliDate] = useState("");

  useEffect(() => {

    setBengaliDate(getBengaliDate());

    fetch("https://workers.dev")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const processedProducts = products.map((prod) => {
    const changePercent = ((prod.currentPrice - prod.yesterdayPrice) / prod.yesterdayPrice) * 100;
    return { ...prod, changePercent };
  });

  const topRisers = [...processedProducts].filter((p) => p.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent).slice(0, 6);
  const topFallers = [...processedProducts].filter((p) => p.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent).slice(0, 6);

  const SkeletonCard = () => (
    <div className="w-full h-44 bg-slate-100 rounded-2xl p-6 border border-slate-200 space-y-4 animate-pulse">
      <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="bg-white pb-24 text-slate-900">


      <section className="max-w-7xl mx-auto px-4 pt-16 pb-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-6">

          <span className="text-xs font-bold tracking-wide text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 inline-block">
            📅 {bengaliDate || "লাইভ বাজার তারিখ লোড হচ্ছে..."}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            আজকের বাজারের দাম এক নজরে <br />
          </h1>
          <p className="text-base text-slate-500 max-w-xl font-medium">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="pt-2">
            <a href="#sob-ponno" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md active:scale-[0.98]">
              সব পণ্য দেখুন
            </a>
          </div>
        </div>


        <div className="flex-1 flex justify-center relative select-none">
          <div className="absolute w-72 h-72 bg-indigo-50 rounded-full blur-3xl -top-10"></div>

          <Image src="/bazar-hero.png"
            alt="Bazar Illustration"
            width={500}
            height={400}
            className="w-full max-w-[400px] h-auto object-contain rounded-3xl filter drop-shadow-md transition-transform duration-300 hover:scale-105" />

          {/* 
          <img 
            
          /> */}
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="mb-6 border-b border-slate-100 pb-3">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>আজ দাম বেড়েছে</span> <span className="text-rose-600">▲</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />) :
            topRisers.map((prod) => <ProductCard key={prod.id} prod={prod} />)
          }
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="mb-6 border-b border-slate-100 pb-3">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>আজ দাম কমেছে</span> <span className="text-emerald-600">▼</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />) :
            topFallers.map((prod) => <ProductCard key={prod.id} prod={prod} />)
          }
        </div>
      </section>


      <section id="sob-ponno" className="max-w-7xl mx-auto px-4 scroll-mt-24">
        <div className="mb-8 border-b border-slate-100 pb-4">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">সব পণ্য</h2>
          <p className="text-sm text-slate-500 mt-1">আজকের বাজারের সমস্ত পণ্যের তালিকা এবং দামের বিবরণ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />) :
            processedProducts.map((prod) => <ProductCard key={prod.id} prod={prod} />)
          }
        </div>
      </section>
    </div>
  );
}

function ProductCard({ prod }) {
  const isUp = prod.changePercent > 0;
  const isDown = prod.changePercent < 0;

  return (
    <Link
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
              ▲ {toBengaliNumber(prod.changePercent.toFixed(1))}%
            </span>
          )}
          {isDown && (
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
              ▼ {toBengaliNumber(Math.abs(prod.changePercent).toFixed(1))}%
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
}
