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
You are an intelligent AI repair assistant for the Wayz platform.

Analyze the user's issue carefully.

Issue Category:
${category}

Issue Description:
${description}

Tasks:
1. Detect the severity level:
   - Low
   - Medium
   - High
   - Critical

2. Estimate realistic repair cost in Indian Rupees (₹)
based on:
- issue type
- repair complexity
- urgency
- labor cost
- material cost
Return ONLY numbers.
Example:
500
1200
3500

Do NOT return USD.
Do NOT return ranges.
Do NOT return text.

3. Give practical repair steps.

4. Provide a short AI analysis summary.

5. Detect nearby service type needed for this issue.
Examples:
- furniture repair
- electrician
- plumber
- carpenter
- appliance repair
- mechanic
- pest control
- painter
- cleaning service

6. Estimate possible user savings if the issue is solved early.

IMPORTANT:
Return ONLY valid JSON.
Do NOT add markdown.
Do NOT add explanation text.

{
  "severity": "Low | Medium | High | Critical",
  "estimated_cost": 0,
  "estimated_savings": 0,
  "service_type": "",
  "repair_steps": [
    "",
    "",
    ""
  ],
  "analysis": ""
}
`;

    const completion =
      await openai.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const raw =
  completion.choices[0].message.content || "{}";

// console.log("RAW AI RESPONSE:", raw);
console.log(
  "RAW AI RESPONSE TYPE:",
  typeof raw
);

console.log(
  "RAW AI RESPONSE:",
  raw
);

//let aiResult;

// try {
//   // remove markdown formatting if exists
//   const cleaned = raw
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();

//   aiResult = JSON.parse(cleaned);

// } catch (parseError) {
//   console.error(
//     "JSON Parse Error:",
//     parseError
//   );

//   // aiResult = {
//   //   problem: "Unable to analyze issue",
//   //   solution:
//   //     "AI response formatting failed.",
//   //   estimated_cost: "Unknown",
//   //   severity: "Medium",
//   // };
// }
let aiResult;

try {
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  aiResult = JSON.parse(cleaned);

  console.log(
    "PARSED AI RESULT:",
    aiResult
  );

} catch (parseError) {
  console.error(
    "JSON Parse Error:",
    parseError
  );

  console.log(
    "FAILED RAW RESPONSE:",
    raw
  );

  return NextResponse.json(
    {
      error:
        "AI returned invalid JSON",
    },
    {
      status: 500,
    }
  );
}
    // SAVE TO SUPABASE
const { data, error } = await supabase
  .from("reports")
  .update({
    severity: aiResult.severity,

    estimated_cost:
      aiResult.estimated_cost,

    estimated_savings:
      aiResult.estimated_savings,

    service_type:
      aiResult.service_type,

    repair_steps:
      aiResult.repair_steps,

    ai_analysis:
      aiResult.analysis,
  })
  .eq("id", reportId)
  .select();

console.log("SUPABASE UPDATE:", data);

if (error) {
  console.error("SUPABASE ERROR:", error);
}

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