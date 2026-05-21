"use client";

import { useEffect, useState } from "react";

export default function AIAnalysis({
  reportId,
  category,
  description,
}: {
  reportId: string;
  category: string;
  description: string;
}) {
  const [analysis, setAnalysis] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    analyzeIssue();
  }, []);

  const analyzeIssue = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          reportId,
          category,
          description,
        }),
      });

      const data = await res.json();

      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchText =
    analysis?.service_type ||
    `${category} repair`;

  if (loading) {
    return (
      <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          AI Resolution Assistant
        </h2>

        <p className="text-gray-400">
          Analyzing issue...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

      <h2 className="text-3xl font-bold mb-8">
        AI Resolution Assistant
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-5">

          <div className="bg-black/20 rounded-2xl p-5 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">
              Severity
            </p>

            <h3 className="text-2xl font-bold text-red-400">
              {analysis?.severity}
            </h3>
          </div>

          <div className="bg-black/20 rounded-2xl p-5 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">
              Estimated Repair Cost
            </p>

            <h3 className="text-2xl font-bold text-yellow-400">
              ₹{analysis?.estimated_cost}
            </h3>
          </div>

          <div className="bg-black/20 rounded-2xl p-5 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">
              Estimated Savings
            </p>

            <h3 className="text-2xl font-bold text-green-400">
              ₹
              {
                analysis?.estimated_savings
              }
            </h3>
          </div>

          <div className="bg-black/20 rounded-2xl p-5 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">
              Service Needed
            </p>

            <h3 className="text-xl font-semibold text-cyan-400 capitalize">
              {
                analysis?.service_type
              }
            </h3>
          </div>

        </div>

        {/* RIGHT */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/10">

          <h3 className="text-xl font-semibold mb-4">
            AI Analysis
          </h3>

          <p className="text-gray-300 leading-8 whitespace-pre-line">
            {analysis?.analysis}
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Repair Steps
            </h3>

            <ul className="space-y-3">
              {analysis?.repair_steps?.map(
                (
                  step: string,
                  index: number
                ) => (
                  <li
                    key={index}
                    className="bg-white/5 rounded-xl px-4 py-3"
                  >
                    {step}
                  </li>
                )
              )}
            </ul>
          </div>

          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              searchText
            )}`}
            target="_blank"
            className="inline-block mt-8 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl font-medium"
          >
            Open Nearby Services in Maps
          </a>

        </div>
      </div>
    </div>
  );
}