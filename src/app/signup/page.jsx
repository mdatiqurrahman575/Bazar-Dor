"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);

    try {

      const { data, error: authError } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        callbackURL: "/",
      });

      if (authError) {

        setError(authError.message || "অ্যাকাউন্ট তৈরি করতে ব্যর্থ হয়েছে।");
        toast.error(authError.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      } else {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      setError("সার্ভারে কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-10 pb-20">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/5 transition-all duration-300 hover:border-white/10">
        

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">
            অ্যাকাউন্ট তৈরি করুন
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            আজই বাজার দরে যোগ দিন এবং লাইভ আপডেট ট্র্যাক করুন
          </p>
        </div>


        {error && (
          <div className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2 animate-pulse">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              আপনার নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
            />
          </div>


          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              ইমেইল এড্রেস
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
            />
          </div>


          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm shadow-lg shadow-indigo-500/10"
          >
            {loading ? (
              <>

                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
              </>
            ) : (
              "নিবন্ধন করুন"
            )}
          </button>
        </form>


        <p className="mt-8 text-center text-xs text-slate-400 font-medium">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition">
            লগইন করুন
          </Link>
        </p>

      </div>
    </div>
  );
}
