"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5 flex items-center justify-between">

      <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl w-96 border border-white/10">
        <Search size={18} className="text-slate-400" />

        <input
          type="text"
          placeholder="Search reports..."
          className="bg-transparent outline-none text-white placeholder:text-slate-400 w-full"
        />
      </div>

      <div className="flex items-center gap-6">

        <button className="relative bg-white/10 p-3 rounded-2xl border border-white/10 hover:bg-white/20 transition">
          <Bell size={20} />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />

          <div>
            <p className="font-semibold">
              Dhakshi
            </p>

            <p className="text-xs text-slate-400">
              Community User
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}