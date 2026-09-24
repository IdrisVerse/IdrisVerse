// Integration point for "Ask My AI Agent".
//
// This module intentionally contains NO API keys and NO third-party calls.
// To connect a real LLM/RAG backend later:
//   1. Set NEXT_PUBLIC_AI_AGENT_ENDPOINT to a server route (e.g. "/api/agent")
//      that proxies to your LLM provider server-side (keep the actual API key
//      server-only, e.g. in a Next.js Route Handler reading process.env.AGENT_API_KEY).
//   2. That route should accept { message: string } and return { reply: string }.
//   3. Once the env var is set, askAgent() below will call it automatically.
// Until then, askAgent() falls back to a small local responder grounded only
// in the content already on this site (src/lib/data.ts) — no invented facts.

import {
  identity,
  skillCategories,
  featuredProjects,
  otherProjects,
  social,
  education,
  certifications,
  currentFocus,
} from "./data";

const AGENT_ENDPOINT = process.env.NEXT_PUBLIC_AI_AGENT_ENDPOINT;

function localRespond(rawMessage: string): string {
  const q = rawMessage.toLowerCase();

  if (/\b(hi|hello|hey)\b/.test(q) && q.length < 20) {
    return `Hey, I'm the local demo agent for ${identity.name}'s portfolio. Ask me about his background, skills, or projects like Cipher Courier and AI Social Media Manager.`;
  }

  if (q.includes("who") && (q.includes("you") || q.includes("mohamed") || q.includes("idris"))) {
    return `${identity.name} is an ${identity.role}. ${identity.tagline}`;
  }

  if (q.includes("about") || q.includes("background")) {
    return identity.about.join(" ");
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return skillCategories
      .map((c) => `${c.title}: ${c.skills.join(", ")}`)
      .join("\n");
  }

  if (q.includes("cipher")) {
    const p = featuredProjects.find((p) => p.slug === "cipher-courier")!;
    return `${p.name} — ${p.summary}\nKey components: ${p.technologies.join(", ")}.`;
  }

  if (q.includes("social media") || q.includes("automation system") || q.includes("telegram")) {
    const p = featuredProjects.find((p) => p.slug === "ai-social-media-manager")!;
    return `${p.name} — ${p.summary}\nWorkflow: ${p.system.join(" → ")}.`;
  }

  if (q.includes("project")) {
    const names = [...featuredProjects.map((p) => p.name), ...otherProjects.map((p) => p.name)];
    return `Featured: ${featuredProjects.map((p) => p.name).join(", ")}. Also: ${otherProjects
      .map((p) => p.name)
      .join(", ")}.\nTotal listed here: ${names.length}.`;
  }

  if (q.includes("machine learning") || q.includes(" ml")) {
    return "Mohamed's background includes Machine Learning — classical ML, feature engineering and classification work such as the Customer Churn Prediction project.";
  }

  if (q.includes("deep learning") || q.includes("neural")) {
    return "Mohamed has worked with Deep Learning / computer vision, including the Brain Tumor MRI Classification and Package Damage Detection projects.";
  }

  if (q.includes("agent") || q.includes("agentic")) {
    return `AI Agents and Agentic AI are Mohamed's current direction — he's exploring: ${currentFocus.join(", ")}.`;
  }

  if (q.includes("automat")) {
    return "Automation shows up in Mohamed's work through n8n-based agentic workflows — e.g. the AI Social Media Manager, which automates content generation and publishing after human approval.";
  }

  if (q.includes("education") || q.includes("university") || q.includes("degree")) {
    return `${education.school} — ${education.faculty} (${education.track}).`;
  }

  if (q.includes("certif")) {
    return certifications.join(", ");
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach")) {
    return `Best way to reach out: LinkedIn — ${social.linkedin}`;
  }

  if (q.includes("github")) {
    return `GitHub: ${social.github}`;
  }

  return "I'm a local demo agent scoped to this portfolio's content — try asking about Mohamed's background, skills, Cipher Courier, AI Social Media Manager, or how to get in touch. A full LLM/RAG backend can be wired in via NEXT_PUBLIC_AI_AGENT_ENDPOINT.";
}

export async function askAgent(message: string): Promise<string> {
  if (AGENT_ENDPOINT) {
    try {
      const res = await fetch(AGENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error(`Agent endpoint returned ${res.status}`);
      const data = (await res.json()) as { reply?: string };
      if (data.reply) return data.reply;
      throw new Error("Agent endpoint returned no reply");
    } catch {
      return "The AI backend isn't reachable right now, so here's a local answer instead:\n\n" + localRespond(message);
    }
  }
  return localRespond(message);
}

export const isLiveAgentConnected = Boolean(AGENT_ENDPOINT);
