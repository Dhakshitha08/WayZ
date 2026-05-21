"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import dynamic from "next/dynamic";
import AIAnalysis from "@/components/AIAnalysis";
import NearbyServices from "@/components/NearbyServices";
import {
  Bell,
  BarChart3,
  FileWarning,
  MapPinned,
  Users,
  Settings,
  Clock3,
  CheckCircle2,
  LogOut,
  Sparkles,
  ChartAreaIcon,
  GrapeIcon,
  GitGraph,
  ChartBar,
} from "lucide-react";
const LiveMap = dynamic(
  () => import("@/components/LiveMap"),
  {
    ssr: false,
  }
);
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
export default function DashboardPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [nearbyCount, setNearbyCount] =
  useState(0);

const [analysis, setAnalysis] =
  useState<any | null>(null);
  const [username, setUsername] = useState("User");
  const [theme, setTheme] = useState("dark");
  const [latestReport, setLatestReport] =useState<any | null>(null);
 const [loading, setLoading] =useState(true);

const [user, setUser] =useState<any>(null);
useEffect(() => {
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      setUser(session.user);
      setLoading(false);
    }
  };

  getSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        router.push("/auth/login");
      }

      setLoading(false);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, [router]);
  useEffect(() => {
  refreshDashboard();
}, []);
useEffect(() => {
  const syncUsername = async () => {
    await getProfile();
  };

  window.addEventListener(
  "storage",
  (event) => {
    if (event.key === "wayz_username") {
      setUsername(event.newValue || "User");
    }
  }
);

  return () => {
    window.removeEventListener(
      "storage",
      syncUsername
    );
  };
}, []);

useEffect(() => {
  const storedName =
    localStorage.getItem("wayz_username");

  if (storedName) {
    setUsername(storedName);
  }
}, []);
useEffect(() => {
  const syncUsername = () => {
    const storedName =
      localStorage.getItem(
        "wayz_username"
      );

    if (storedName) {
      setUsername(storedName);
    }

    getProfile();
  };

  window.addEventListener(
    "storage",
    syncUsername
  );

  return () => {
    window.removeEventListener(
      "storage",
      syncUsername
    );
  };
}, []);
// useEffect(() => {
//   const storedReport =
//     localStorage.getItem("latest_report");

//   if (storedReport) {
//     setLatestReport(
//       JSON.parse(storedReport)
//     );
//   }
// }, []);
const refreshDashboard = async () => {
  await getProfile();
  await getReports();
};

const getProfile = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user){ router.push("/auth/login");return;}


    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    if (data?.username) {
      console.log(
        "Fetched username:",
        data.username
      );

      setUsername(data.username);

      localStorage.setItem(
        "wayz_username",
        data.username
      );
    }
  } catch (err) {
    console.error(err);
  }
};
const getReports = async () => {
  try {
    // CURRENT USER
    const {
      data: { user },
    } = await supabase.auth.getUser();

   if (!user){ router.push("/auth/login");return;}

    // FETCH ONLY CURRENT USER REPORTS
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    // SAVE REPORTS
    setReports(data || []);
    if (data && data.length > 0) {
  setLatestReport(data[0]);
}
    // IMPORTANT:
    // ONLY RESET IF USER HAS NO REPORTS
    if (!data || data.length === 0) {
      setLatestReport(null);
      setAnalysis(null);
      setNearbyCount(0);
    }

  } catch (err) {
    console.error(err);
  }
};
  // const handleLogout = async () => {
  //   await supabase.auth.signOut();

  //   router.push("/auth/login");
  // };
  const handleLogout = async () => {
  localStorage.removeItem("latest_report");
  localStorage.removeItem("wayz_username");

  setLatestReport(null);
  setReports([]);

  await supabase.auth.signOut();

  router.push("/auth/login");
};
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#06110d] text-white flex">
      {/* SIDEBAR */}
      <aside className="w-[270px] bg-[#071510] border-r border-white/10 flex flex-col justify-between p-6">
        <div>
          {/* LOGO */}
          <div className="flex flex-col items-center mb-10">
            <Image
              src="/logo.png"
              alt="Wayz Logo"
              width={150}
              height={150}
              className="w-auto h-auto"
            />

            <p className="text-sm mt-2 text-gray-300">
              Report. Connect. Resolve.
            </p>
          </div>

          {/* MENU */}
          <div className="space-y-3">
            <button
  onClick={() => router.push("/dashboard")}
  className="w-full flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-700 px-4 py-3 rounded-2xl shadow-lg shadow-green-500/20"
>
  <BarChart3 size={20} />
  Dashboard
</button>

<button
  onClick={() => router.push("/report")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
>
  <FileWarning size={20} />
  Report New Problem
</button>

<button
  onClick={() => router.push("/issues")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
>
  <Clock3 size={20} />
  Recent Issues
</button>



<button
  onClick={() => router.push("/assistant")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
>
  <Users size={20} />
  AI Assistant
</button>

{/* <button
  onClick={() => router.push("/statistics")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
>
  <ChartBar size={20} />
  Statistics
</button> */}

<button
  onClick={() => router.push("/settings")}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition"
>
  <Settings size={20} />
  Settings
</button>

          </div>
        </div>
<div className="mt-10">
  <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
    Recent Issues
  </p>

  <div className="space-y-3">
    {reports.slice(0, 3).map((report) => (
      <div
        key={report.id}
        className="bg-white/5 border border-white/10 rounded-2xl p-3 hover:border-green-500/20 transition cursor-pointer"
      >
        <p className="font-medium text-sm">
          {report.title}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {new Date(report.created_at).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>
        {/* USER CARD */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-900/10 border border-white/10 rounded-3xl p-5">
          <h3 className="text-xl font-semibold leading-relaxed">
            Smart solutions for everyday problems.
          </h3>

          <div className="mt-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-700 flex items-center justify-center text-xl font-bold text-white">
  {username?.charAt(0).toUpperCase()}
</div>
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-sm text-gray-400">Wayz User</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 transition rounded-2xl py-3 text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome back,
              <span className="text-green-400"> {username} 👋</span>
            </h1>

            <p className="text-gray-400 mt-2">
              AI-powered insights and repair assistance for your reported issues.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative p-3 rounded-full bg-white/5 hover:bg-white/10 transition">
              {/* <Bell size={22} />

              <span className="absolute -top-1 -right-1 bg-green-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span> */}
            </button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-700 flex items-center justify-center text-xl font-bold text-white">
  {username?.charAt(0).toUpperCase()}
</div>
          </div>
        </div>
<div className="mb-8 rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-br from-green-500/20 via-emerald-900/10 to-black/20 p-8 relative">

  <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/10 blur-3xl rounded-full" />

  <div className="relative z-10">
    <p className="uppercase tracking-[0.3em] text-green-400 text-xs mb-4">
      AI SMART ASSISTANT
    </p>

    <h2 className="text-5xl font-bold leading-tight max-w-3xl">
      Instantly detect household problems and find the right solution.
    </h2>

    <p className="text-gray-300 mt-6 max-w-2xl text-lg leading-8">
      Wayz analyzes your issue, suggests repair actions,
      estimates repair costs, and helps locate nearby professionals.
    </p>

    <button
      onClick={() => router.push("/report")}
      className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 transition font-semibold"
    >
      Report New Problem
    </button>
  </div>
</div>
        
{latestReport && (
  <>
    {/* AI ANALYSIS */}
    <div className="mt-8">
      <AIAnalysis
        reportId={latestReport.id}
        category={latestReport.category}
        description={latestReport.description}
      />
    </div>

    {/* SMART STATS */}
    <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">

      {/* REPAIR ASSISTANCE */}
      {/* <div className="w-full md:w-[350px] rounded-3xl bg-white/5 border border-cyan-500/20 p-6">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-gray-400">
              Repair Assistance
            </p>

            <h2 className="text-4xl font-bold mt-3 text-cyan-400">
  {nearbyCount}
</h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
            <MapPinned className="text-cyan-400" />
          </div>
        </div>

        <p className="text-cyan-400 text-sm mt-4">
          Nearby help suggestions generated
        </p>
      </div> */}

      {/* SAVINGS */}
      {/* <div className="w-full md:w-[350px] rounded-3xl bg-white/5 border border-yellow-500/20 p-6">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-gray-400">
              Estimated Savings
            </p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-400">
  ₹
  {analysis?.estimated_savings || 0}
</h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
            <BarChart3 className="text-yellow-400" />
          </div>
        </div>

        <p className="text-yellow-400 text-sm mt-4">
          Early issue detection reduced repair costs
        </p>
      </div> */}

    </div>
  </>
)}

      </main>
    </div>
  );
}
