"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Clock3,
  MapPinned,
  Sparkles,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

export default function IssuesPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    
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
    if (data) {
  console.log("LATEST REPORTS:", data);
  setReports(data);
}

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110d] text-white p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Repair History
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          View your previously reported issues,
          AI-generated repair insights,
          and repair navigation history.
        </p>
      </div>

      {/* EMPTY */}
      {reports.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
          <p className="text-gray-400 text-lg">
            No repair history available yet.
          </p>
        </div>
      )}

      {/* REPORTS */}
      <div className="space-y-8">
        {reports.map((report) => {
          const isOpen = expandedId === report.id;

          return (
            <div
              key={report.id}
              className="rounded-[32px] bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl"
            >
              {/* TOP SECTION */}
              <div className="p-7">
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                  
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm">
                        {report.category}
                      </span>

                      <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm">
                        AI Analyzed
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                      {report.title}
                    </h2>

                    <p className="text-gray-300 mt-4 leading-8 max-w-3xl">
                      {report.description}
                    </p>

                    {/* DATE + TIME */}
                    <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {new Date(report.created_at).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {new Date(report.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* IMAGE */}
                  {report.image_url && (
                    <img
                      src={report.image_url}
                      alt="Issue"
                      className="w-full xl:w-[320px] h-[220px] object-cover rounded-3xl border border-white/10"
                    />
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {/* OPEN MAPS */}
                  <a
                    href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                    target="_blank"
                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 transition font-medium flex items-center gap-3"
                  >
                    <MapPinned size={20} />
                    Open in Maps
                  </a>

                  {/* VIEW AI */}
                  <button
                    onClick={async () => {
  if (isOpen) {
    setExpandedId(null);
  } else {
    await getReports();
    setExpandedId(report.id);
  }
}}
                    className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition font-medium flex items-center gap-3"
                  >
                    <Sparkles size={20} />
                    {isOpen
                      ? "Hide AI Analysis"
                      : "View AI Analysis"}
                  </button>
                </div>
              </div>

              {/* EXPANDED AI SECTION */}
              {isOpen && (
                <div className="border-t border-white/10 bg-black/20 p-7">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* SEVERITY */}
                    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="text-yellow-400" />
                        <h3 className="text-xl font-semibold">
                          Severity
                        </h3>
                      </div>

                      <p className="text-yellow-300 text-lg">
                        {report.severity ?? "Not Available"}
                      </p>
                    </div>

                    {/* COST */}
                    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <IndianRupee className="text-green-400" />
                        <h3 className="text-xl font-semibold">
                          Estimated Cost
                        </h3>
                      </div>

                      <p className="text-green-300 text-lg">
                        ₹{report.estimated_cost ?? "Not Available"}
                      </p>
                    </div>
                  </div>

                  {/* AI ANALYSIS */}
                  <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-7">
                    <h3 className="text-2xl font-semibold mb-5">
                      AI Repair Analysis
                    </h3>

                    <div className="text-gray-300 leading-8 whitespace-pre-wrap">
                      ₹{report.estimated_cost ?? "Not Available"}
                    </div>
                  </div>

                  {/* REPAIR STEPS */}
<div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-7">
  <h3 className="text-2xl font-semibold mb-5">
    Suggested Repair Steps
  </h3>

  {Array.isArray(report.repair_steps) ? (
    <ul className="space-y-4">
      {report.repair_steps.map(
        (
          step: string,
          index: number
        ) => (
          <li
            key={index}
            className="bg-black/20 rounded-2xl px-5 py-4 border border-white/10"
          >
            {step}
          </li>
        )
      )}
    </ul>
  ) : (
    <p className="text-gray-400">
      No repair steps available.
    </p>
  )}
</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}