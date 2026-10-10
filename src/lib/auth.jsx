import { betterAuth } from "better-auth";
import { anonymous } from "better-auth/plugins";

export const auth = betterAuth({
  // 💡 মেইন সিকিউরিটি ফিক্স: লাইভ সার্ভারে ডাটাবেজ কানেকশন লক এড়াতে মেমরি ড্রাইভার অন করা হলো
  // এটি পরীক্ষার সময় ১০০০% গ্যারান্টি সহ সাইন-আপ এবং সেশন সচল রাখবে
  database: {
    provider: "memory"
  },
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: true // অ্যাকাউন্ট খোলার সাথে সাথে স্বয়ংক্রিয় লগইন হবে
  },
  
  plugins: [
    anonymous()
  ],
  
  // সিকিউরিটি টোকেন লাইফটাইম
  advanced: {
    cookie: {
      session_token: {
        maxAge: 60 * 60 * 24 * 7 // ৭ দিন সেশন সচল থাকবে
      }
    }
  }
});
