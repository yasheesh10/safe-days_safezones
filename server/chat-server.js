import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "Chat server running with AI" });
});

// chat route using Ollama
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  model: "phi3",
prompt: `
You are an AI assistant for a Tourist Safety & Incident Response website.

Help users understand features like Emergency SOS, Safe Zones, Dashboards, and Safety Systems.
If the question is unrelated, answer normally like ChatGPT.

User: ${message}
Assistant:
`,

  stream: false,
}),

    });

    const data = await ollamaResponse.json();

    res.json({
      reply: data.response,
    });
  } catch (error) {
    console.error("Ollama error:", error);
    res.status(500).json({
      reply: "⚠️ AI service is not available right now.",
    });
  }
});

// start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`💬 AI Chat server running on http://localhost:${PORT}`);
});
