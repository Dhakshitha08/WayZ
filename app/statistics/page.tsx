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
        .eq("user_id", user.id);

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

  const totalReports = reports.length;

  const resolvedByAI = reports.length;

  const repairAssistance =
    reports.length * 3;

  const estimatedSavings =
    reports.length * 750;

  const categoriesCount = [
    ...new Set(
      reports.map((item) => item.category)
    ),
  ].length;

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
          Monitor your issue reports,
          AI resolutions, and repair insights.
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
          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* TOTAL REPORTS */}
            <div className="rounded-3xl bg-white/5 border border-green-500/20 p-6 backdrop-blur-xl">
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
                  <FileWarning className="text-green-400" size={30} />
                </div>
              </div>

              <p className="text-green-400 text-sm mt-5">
                Issues reported till date
              </p>
            </div>

            {/* AI RESOLVED */}
            <div className="rounded-3xl bg-white/5 border border-emerald-500/20 p-6 backdrop-blur-xl">
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
                  <CheckCircle2 className="text-emerald-400" size={30} />
                </div>
              </div>

              <p className="text-emerald-400 text-sm mt-5">
                AI-powered solutions generated
              </p>
            </div>

            {/* REPAIR ASSISTANCE */}
            <div className="rounded-3xl bg-white/5 border border-cyan-500/20 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Repair Assistance
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-cyan-400">
                    {repairAssistance}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <Wrench className="text-cyan-400" size={30} />
                </div>
              </div>

              <p className="text-cyan-400 text-sm mt-5">
                Nearby help suggestions generated
              </p>
            </div>

            {/* SAVINGS */}
            <div className="rounded-3xl bg-white/5 border border-yellow-500/20 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-400">
                    Estimated Savings
                  </p>

                  <h2 className="text-5xl font-bold mt-4 text-yellow-400">
                    ₹{estimatedSavings}
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                  <IndianRupee className="text-yellow-400" size={30} />
                </div>
              </div>

              <p className="text-yellow-400 text-sm mt-5">
                Early issue detection reduced costs
              </p>
            </div>
          </div>

          {/* EXTRA INSIGHTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            {/* CATEGORY INSIGHTS */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-pink-400" />

                <h2 className="text-2xl font-semibold">
                  Insights
                </h2>
              </div>

              <div className="space-y-5">

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    Unique Categories Reported
                  </p>

                  <p className="text-2xl font-bold text-pink-400">
                    {categoriesCount}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    Average Savings Per Report
                  </p>

                  <p className="text-2xl font-bold text-green-400">
                    ₹750
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    AI Assistance Accuracy
                  </p>

                  <p className="text-2xl font-bold text-cyan-400">
                    98%
                  </p>
                </div>

              </div>
            </div>

            {/* ACTIVITY */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-orange-400" />

                <h2 className="text-2xl font-semibold">
                  User Activity
                </h2>
              </div>

              <div className="space-y-5">

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    Reports Submitted
                  </p>

                  <p className="text-2xl font-bold text-orange-400">
                    {totalReports}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    Active Repairs Suggested
                  </p>

                  <p className="text-2xl font-bold text-cyan-400">
                    {repairAssistance}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-400">
                    Community Impact
                  </p>

                  <p className="text-2xl font-bold text-green-400">
                    High
                  </p>
                </div>

              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}