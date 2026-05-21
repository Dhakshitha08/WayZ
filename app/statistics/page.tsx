"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  FileWarning,
  CheckCircle2,
  IndianRupee,
  Wrench,
  TrendingUp,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function StatisticsPage() {
  const router = useRouter();

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

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

      setReports(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REAL DATA ---------------- */

  const totalReports = reports.length;

  const resolvedByAI = reports.filter(
    (r) => r.ai_analysis
  ).length;

  const totalSavings = reports.reduce(
    (sum, item) =>
      sum + Number(item.estimated_savings || 0),
    0
  );

  const totalRepairServices = reports.filter(
    (r) => r.service_type
  ).length;

  const categories = reports.map(
    (r) => r.category
  );

  const uniqueCategories = [
    ...new Set(categories),
  ];

  const categoriesCount =
    uniqueCategories.length;

  const latestIssue =
    reports[0]?.title || "No reports";

  const highSeverity = reports.filter(
    (r) =>
      r.severity === "High"
  ).length;

  const criticalSeverity = reports.filter(
    (r) =>
      r.severity === "Critical"
  ).length;

  const totalCost = reports.reduce(
    (sum, item) =>
      sum + Number(item.estimated_cost || 0),
    0
  );

  const avgRepairCost =
    resolvedByAI > 0
      ? Math.round(totalCost / resolvedByAI)
      : 0;

  const avgSavings =
    resolvedByAI > 0
      ? Math.round(totalSavings / resolvedByAI)
      : 0;

  const successRate =
    totalReports > 0
      ? Math.round(
          (resolvedByAI / totalReports) * 100
        )
      : 0;

  /* MOST REPORTED CATEGORY */

  const categoryFrequency: any = {};

  categories.forEach((cat) => {
    categoryFrequency[cat] =
      (categoryFrequency[cat] || 0) + 1;
  });

  const mostReportedCategory =
    Object.keys(categoryFrequency).reduce(
      (a, b) =>
        categoryFrequency[a] >
        categoryFrequency[b]
          ? a
          : b,
      Object.keys(categoryFrequency)[0]
    ) || "N/A";

  return (
    <div className="min-h-screen bg-[#06110d] text-white p-8">

      {/* HEADER */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.3em] text-green-400 text-xs mb-4">
          WAYZ ANALYTICS
        </p>

        <h1 className="text-5xl font-bold">
          Statistics Dashboard
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Real-time insights from your reported issues and AI analysis.
        </p>
      </div>

      {loading ? (
        <div className="text-center mt-32">
          <p className="text-xl text-gray-400">
            Loading statistics...
          </p>
        </div>
      ) : (
        <>
          {/* MAIN STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* TOTAL ISSUES */}
            <div className="rounded-3xl bg-white/5 border border-green-500/20 p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Total Issues
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-green-400">
                    {totalReports}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                  <FileWarning
                    className="text-green-400"
                    size={30}
                  />
                </div>
              </div>

              <p className="text-green-400 text-sm mt-5">
                Issues reported till date
              </p>
            </div>

            {/* AI RESOLUTION */}
            <div className="rounded-3xl bg-white/5 border border-emerald-500/20 p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    AI Resolutions
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-emerald-400">
                    {resolvedByAI}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2
                    className="text-emerald-400"
                    size={30}
                  />
                </div>
              </div>

              <p className="text-emerald-400 text-sm mt-5">
                AI-powered solutions generated
              </p>
            </div>

            {/* REPAIR SERVICES */}
            <div className="rounded-3xl bg-white/5 border border-cyan-500/20 p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Repair Assistance
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-cyan-400">
                    {totalRepairServices}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <Wrench
                    className="text-cyan-400"
                    size={30}
                  />
                </div>
              </div>

              <p className="text-cyan-400 text-sm mt-5">
                Nearby repair services detected
              </p>
            </div>

            {/* SAVINGS */}
            <div className="rounded-3xl bg-white/5 border border-yellow-500/20 p-6">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Estimated Savings
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-yellow-400">
                    ₹{totalSavings}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                  <IndianRupee
                    className="text-yellow-400"
                    size={30}
                  />
                </div>
              </div>

              <p className="text-yellow-400 text-sm mt-5">
                Savings from early detection
              </p>
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            {/* ISSUE INSIGHTS */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="text-pink-400" />

                <h2 className="text-2xl font-semibold">
                  Issue Insights
                </h2>
              </div>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Most Reported Category
                  </p>

                  <p className="text-pink-400 font-bold text-xl">
                    {mostReportedCategory}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Unique Categories
                  </p>

                  <p className="text-green-400 font-bold text-xl">
                    {categoriesCount}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Critical Issues
                  </p>

                  <p className="text-red-400 font-bold text-xl">
                    {criticalSeverity}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    High Severity Issues
                  </p>

                  <p className="text-orange-400 font-bold text-xl">
                    {highSeverity}
                  </p>
                </div>

              </div>
            </div>

            {/* USER ACTIVITY */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

              <div className="flex items-center gap-3 mb-8">
                <Activity className="text-cyan-400" />

                <h2 className="text-2xl font-semibold">
                  AI & User Activity
                </h2>
              </div>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Resolution Success Rate
                  </p>

                  <p className="text-cyan-400 font-bold text-xl">
                    {successRate}%
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Average Repair Cost
                  </p>

                  <p className="text-yellow-400 font-bold text-xl">
                    ₹{avgRepairCost}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Latest Issue Reported
                  </p>

                  <p className="text-green-400 font-bold text-xl">
                    {latestIssue}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-400">
                    Service Recommendations
                  </p>

                  <p className="text-pink-400 font-bold text-xl">
                    {totalRepairServices}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* EXTRA REAL ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

            <div className="rounded-3xl bg-white/5 border border-red-500/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle className="text-red-400" />

                <h3 className="text-xl font-semibold">
                  Response Monitor
                </h3>
              </div>

              <p className="text-5xl font-bold text-red-400">
                {resolvedByAI}
              </p>

              <p className="text-gray-400 mt-4">
                AI analyses completed successfully for submitted reports.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-green-500/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <Sparkles className="text-green-400" />

                <h3 className="text-xl font-semibold">
                  Savings Analysis
                </h3>
              </div>

              <p className="text-5xl font-bold text-green-400">
                ₹{avgSavings}
              </p>

              <p className="text-gray-400 mt-4">
                Average estimated savings per reported issue.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-cyan-500/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                <ShieldAlert className="text-cyan-400" />

                <h3 className="text-xl font-semibold">
                  Service Tracker
                </h3>
              </div>

              <p className="text-5xl font-bold text-cyan-400">
                {uniqueCategories.length}
              </p>

              <p className="text-gray-400 mt-4">
                Repair service categories identified by AI recommendations.
              </p>
            </div>

          </div>
        </>
      )}
    </div>
  );
}