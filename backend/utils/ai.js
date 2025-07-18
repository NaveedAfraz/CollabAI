import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets.

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response =
    await supportAgent.run(`Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "Node.js"])

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "high",
"helpfulNotes": "Here are useful tips...",
"relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title || "Untitled"}
- Description: ${ticket.description}
`);

  const raw = response.output?.[0]?.content;
  console.log("Raw AI output:", raw);

  if (!raw) {
    console.error("AI response was undefined or malformed:", response.output);
    return {
      code: "AI_RESPONSE_EMPTY",
      message: "AI did not return a usable response.",
    };
  }

  let jsonString = raw.trim();
  if (jsonString.startsWith("```")) {
    jsonString = jsonString
      .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
      .trim();
  }

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error(
      "Failed to parse cleaned JSON from AI response:",
      jsonString,
      e.message
    );
    return {
      code: "AI_PARSE_ERROR",
      message: "Failed to parse cleaned JSON from AI output.",
      detail: e.message,
    };
  }
};

export default analyzeTicket;
