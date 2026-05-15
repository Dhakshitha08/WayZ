"use client";

import { useState } from "react";

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    if (!question) return;

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "General Problem",
          description: question,
        }),
      });

      const data = await res.json();

      setAnswer(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110d] text-white p-8">
      <h1 className="text-4xl font-bold">
        AI Assistant
      </h1>

      <p className="text-gray-400 mt-2 mb-8">
        Ask repair-related questions and get AI guidance.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: How to fix water leakage in kitchen?"
          rows={5}
          className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
        />

        <button
          onClick={askAI}
          className="mt-5 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 transition font-semibold"
        >
          Ask AI
        </button>

        {answer && (
          <div className="mt-8 bg-black/20 border border-white/10 rounded-2xl p-6 whitespace-pre-wrap leading-8">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}