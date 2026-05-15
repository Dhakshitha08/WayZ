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
  const [result, setResult] = useState(
    "Analyzing issue..."
  );

  useEffect(() => {
    analyzeIssue();
  }, []);

  const analyzeIssue = async () => {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          reportId,
          category,
          description,
        }),
      });

      const data = await res.json();

      setResult(data.analysis);
    } catch (err) {
      console.error(err);

      setResult(
        "AI analysis could not be generated."
      );
    }
  };

  const searchText = `${category} near me`;

  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        AI Resolution Assistant
      </h2>

      <div className="text-gray-300 whitespace-pre-line leading-8">
        {result}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(
            searchText
          )}`}
          target="_blank"
          className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-2xl font-medium"
        >
          Open in Maps
        </a>
      </div>
    </div>
  );
}