"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  FileWarning,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: FileWarning,
    label: "Report Issue",
  },
  {
    icon: ClipboardList,
    label: "My Reports",
  },
  {
    icon: BarChart3,
    label: "Analytics",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-white/10 bg-white/5 backdrop-blur-xl p-6">

      <div className="mb-12">
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          WAYZ
        </h1>

        <p className="text-slate-400 mt-2">
          Smart Civic Reporting
        </p>
      </div>

      <nav className="space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href="#"
              className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-cyan-500/10 hover:border hover:border-cyan-400/30"
            >
              <div className="rounded-xl bg-white/10 p-2 group-hover:bg-cyan-500/20 transition">
                <Icon size={20} />
              </div>

              <span className="text-lg">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}