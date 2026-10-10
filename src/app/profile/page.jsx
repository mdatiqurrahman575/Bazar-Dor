"use client";

import { useEffect, useState, Suspense } from "react"; 
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 
import Link from "next/link";
import toast from "react-hot-toast";


function ProfilePageContent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session, isPending: sessionLoading } = authClient.useSession();

  useEffect(() => {
    if (sessionLoading) return;

    if (!session) {
      toast.error("প্রোফাইল দেখতে হলে আপনাকে প্রথমে সাইন ইন করতে হবে!");
      router.push("/login");
      return;
    }

    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session, sessionLoading, router]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault(); 
    if (!name.trim()) {
      toast.error("নামের ফিল্ডটি খালি রাখা যাবে না!");
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await authClient.user.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
      } else {
        toast.success("আপনার নাম সফলভাবে আপডেট করা হয়েছে! 🎉");
        router.refresh();
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("সার্ভারে কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
 
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      

      <Link href="/" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition mb-6 inline-block">
        ← বাজারে ফিরে যান
      </Link>


      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          আমার প্রোফাইল
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          আপনার অ্যাকাউন্টের তথ্য এখান থেকে পরিবর্তন করুন
        </p>
      </div>


      <form onSubmit={handleUpdateInfo} className="space-y-6">
        

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            ইমেইল এড্রেস (পরিবর্তন অযোগ্য)
          </label>
          <input
            type="email"
            disabled
            value={session?.user?.email || ""}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-sm cursor-not-allowed select-none"
          />
        </div>


        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            আপনার নাম (Name)
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} 
            placeholder="আপনার নতুন নাম লিখুন"
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-sm"
          />
        </div>


        <button
          type="submit"
          disabled={loading} 
          className="w-full py-3.5 px-4 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-sm shadow-md"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>তথ্য আপডেট হচ্ছে...</span>
            </>
          ) : (
            "Update Information"
          )}
        </button>
      </form>

    </div>
  );
}


export default function ProfilePage() {
  return (

    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 pt-10 pb-20">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 flex flex-col items-center justify-center py-20 gap-4 shadow-md">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 text-xs font-medium">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      }>
        <ProfilePageContent />
      </Suspense>
    </div>
  );
}
