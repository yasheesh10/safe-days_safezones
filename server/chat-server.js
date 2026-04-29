import express from "express";
import cors from "cors";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

app.use(cors());  
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

// SOS EMAIL ROUTE
// SOS EMAIL ROUTE
app.post("/api/send-sos-alert", async (req, res) => {
  try {
    const { contacts, latitude, longitude } = req.body;

    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log("🚨 SOS HIT");

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sawantyash1011@gmail.com", // 🔥 testing email
      subject: "SOS Alert 🚨",
      html: `<a href="${locationLink}">${locationLink}</a>`,
    });

    console.log("✅ EMAIL SENT:", result);

    res.json({ success: true });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`💬 AI Chat server running on http://localhost:${PORT}`);
});
