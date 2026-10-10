export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-8 mt-auto text-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">


        <div className="space-y-1">
          <p className="text-xs text-slate-500 font-medium">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>


        <div className="max-w-md">
          <p className="text-xs text-slate-400 font-medium leading-relaxed sm:text-right">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

      </div>
    </footer>
  );
}
