"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getBengaliDate, toBengaliNumber } from "@/lib/utils";

const fallbackProducts = [
  { id: 1, name: "মিনিকেট চাল", currentPrice: 72, yesterdayPrice: 70, unit: "কেজি", emoji: "🍚" },
  { id: 2, name: "নাজিরশাইল চাল", currentPrice: 85, yesterdayPrice: 85, unit: "কেজি", emoji: "🍚" },
  { id: 3, name: "মসুর ডাল", currentPrice: 140, yesterdayPrice: 145, unit: "কেজি", emoji: "🫘" },
  { id: 4, name: "সয়াবিন তেল", currentPrice: 165, yesterdayPrice: 160, unit: "লিটার", emoji: "🫙" },
  { id: 5, name: "দেশী পেঁয়াজ", currentPrice: 110, yesterdayPrice: 120, unit: "কেজি", emoji: "🧅" },
  { id: 6, name: "রসুন", currentPrice: 220, yesterdayPrice: 210, unit: "কেজি", emoji: "🧄" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [bengaliDate, setBengaliDate] = useState("");
  const [products, setProducts] = useState(fallbackProducts);
  const [mounted, setMounted] = useState(false);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
    setBengaliDate(getBengaliDate());

    fetch("https://workers.dev")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch((err) => console.log("API Down, using fallback."));
  }, []);

  const categories = [
    { name: "সব পণ্য", slug: "/" },
    { name: "চাল", slug: "/category/chal" },
    { name: "ডাল", slug: "/category/dal" },
    { name: "তেল", slug: "/category/tel" },
    { name: "সবজি", slug: "/category/sobji" },
    { name: "মাছ", slug: "/category/mach" },
    { name: "মাংস", slug: "/category/mangso" },
    { name: "মসলা", slug: "/category/mosla" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  return (

    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex justify-center items-center gap-3">

          <span className="text-4xl border rounded-xl p-1">🛒</span>
          <div>
            <span className="text-2xl font-black text-slate-900 flex items-center gap-1">
              বাজার দর
            </span>
            <span className="text-xs text-indigo-600 font-bold mt-0.5">
              {mounted ? bengaliDate : "লোডিং..."}
            </span>
          </div>

        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-indigo-500">
                <div className="w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-white border border-slate-200 rounded-xl w-52 text-slate-800">
                <li className="px-4 py-2 text-xs text-slate-500 border-b border-slate-100">হাই, {session.user.name}</li>
                <li><Link href="/profile" className="hover:bg-slate-100 py-2.5">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut} className="text-red-600 hover:bg-red-50 py-2.5">সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">

              <Link href="/login" className="btn btn-sm sm:btn-md btn-ghost text-slate-700 font-bold hover:bg-slate-100">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md bg-indigo-600 border-none text-white font-bold hover:bg-indigo-700 shadow-md">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>


      <div className="w-full bg-slate-50 border-t border-slate-200 px-4 overflow-x-auto scrollbar-none">
        <nav className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1 h-12">
          {categories.map((cat) => {
            const isActive = pathname === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug}
                className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-200 whitespace-nowrap ${isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </nav>
      </div>


      <div className="w-full bg-indigo-50/60 border-t border-indigo-100 h-10 flex items-center overflow-hidden relative select-none">
        <div className="flex whitespace-nowrap gap-12 text-sm text-slate-700 font-bold animate-marquee-loop" style={{ display: 'flex' }}>
          {[...products, ...products].map((prod, idx) => {
            const change = ((prod.currentPrice - prod.yesterdayPrice) / prod.yesterdayPrice) * 100;
            const isUp = change > 0;
            const isDown = change < 0;

            return (
              <div key={idx} className="flex items-center gap-2">
                <span>{prod.emoji || "🛒"}</span>
                <span className="text-slate-900">{prod.name}</span>
                <span className="text-indigo-700">{toBengaliNumber(prod.currentPrice)} টাকা/{prod.unit}</span>
                {isUp && <span className="text-rose-600 font-bold">▲ {toBengaliNumber(change.toFixed(1))}%</span>}
                {isDown && <span className="text-emerald-600 font-bold">▼ {toBengaliNumber(Math.abs(change).toFixed(1))}%</span>}
                {!isUp && !isDown && <span className="text-slate-400">— ০.০%</span>}
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop { animation: marquee 80s linear infinite; }
        .animate-marquee-loop:hover { animation-play-state: paused; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </header>
  );
}
