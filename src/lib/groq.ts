const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: { message: { content: string } }[];
}

export const callGroq = async (
  messages: Message[],
  model: string = "llama-3.3-70b-versatile"
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey || apiKey === "your_groq_api_key_here") {
    throw new Error("Groq API key not configured");
  }

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 2048 }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${err}`);
  }

  const data: GroqResponse = await response.json();
  return data.choices[0]?.message?.content || "";
};

export const generateContent = async (
  type: string,
  topic: string,
  audience: string,
  tone: string
): Promise<string> => {
  return callGroq([
    {
      role: "system",
      content: `You are an expert content strategist. Create high-quality ${type} content. Be specific, engaging, and actionable. Format with markdown.`,
    },
    {
      role: "user",
      content: `Create a ${type} about "${topic}" for ${audience} audience in a ${tone} tone. Include a compelling headline, structured body, and clear call-to-action.`,
    },
  ]);
};

export const reviewCompliance = async (content: string, brand: string): Promise<string> => {
  return callGroq([
    {
      role: "system",
      content: "You are a brand compliance and legal review specialist. Analyze content for brand consistency, legal risks, tone alignment, and regulatory compliance. Provide a structured report with scores and recommendations.",
    },
    {
      role: "user",
      content: `Review the following content for brand "${brand}" compliance:\n\n${content}\n\nProvide: 1) Overall compliance score (0-100), 2) Brand tone alignment, 3) Legal/regulatory flags, 4) Terminology issues, 5) Recommendations.`,
    },
  ]);
};

export const localizeContent = async (content: string, targetLang: string): Promise<string> => {
  return callGroq([
    {
      role: "system",
      content: "You are an expert content localizer. Translate and culturally adapt content while maintaining brand voice and intent. Don't just translate—localize for the target market.",
    },
    {
      role: "user",
      content: `Localize the following content to ${targetLang}. Adapt cultural references, idioms, and formatting conventions:\n\n${content}`,
    },
  ]);
};

export const analyzeEngagement = async (contentDescription: string): Promise<string> => {
  return callGroq([
    {
      role: "system",
      content: "You are a content analytics specialist. Analyze content performance patterns and provide strategic recommendations for optimization.",
    },
    {
      role: "user",
      content: `Analyze the engagement potential of the following content and provide recommendations for: scheduling, format optimization, A/B testing ideas, and channel-specific adaptations:\n\n${contentDescription}`,
    },
  ]);
};
