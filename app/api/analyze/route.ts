import { NextResponse } from "next/server";

import OpenAI from "openai";

import { supabase } from "@/lib/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
  try {
    const {
      reportId,
      category,
      description,
    } = await req.json();

    const prompt = `
You are an AI home repair assistant.

Analyze this issue:

Category: ${category}

Description:
${description}

Return ONLY valid JSON.

{
  "severity": "",
  "estimated_cost": "",
  "repair_steps": "",
  "analysis": ""
}
`;

    const completion =
      await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const raw =
  completion.choices[0].message.content || "{}";

console.log("RAW AI RESPONSE:", raw);

let aiResult;

try {
  // remove markdown formatting if exists
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  aiResult = JSON.parse(cleaned);

} catch (parseError) {
  console.error(
    "JSON Parse Error:",
    parseError
  );

  aiResult = {
    problem: "Unable to analyze issue",
    solution:
      "AI response formatting failed.",
    estimated_cost: "Unknown",
    severity: "Medium",
  };
}

    // SAVE TO SUPABASE
    const { error } = await supabase
      .from("reports")
      .update({
        severity: aiResult.severity,
        estimated_cost:
          aiResult.estimated_cost,
        repair_steps:
          aiResult.repair_steps,
        ai_analysis:
          aiResult.analysis,
      })
      .eq("id", reportId);

    if (error) {
      console.error(error);
    }

    return NextResponse.json(aiResult);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "AI analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}