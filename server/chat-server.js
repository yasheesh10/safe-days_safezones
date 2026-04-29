import express from "express";
import cors from "cors";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://safe-days-safezones.vercel.app"]
}));
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
app.post("/api/send-sos-alert", async (req, res) => {
  try {
    const { contacts, latitude, longitude, message } = req.body;

    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log("🚨 SOS HIT - contacts:", contacts);

    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ error: "No contacts provided" });
    }

for (const contact of contacts) {
  try {
    console.log("👉 Sending to:", contact.email);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sawantyash1011@gmail.com", // 🔥 TEMP FIX
      subject: "SOS Alert - SAFE DAYS 🚨",
      html: `
        <h2>Emergency Alert!</h2>
        <p>User needs help.</p>
        <a href="${locationLink}">${locationLink}</a>
        <p>${message || ""}</p>
      `,
    });

    console.log("✅ EMAIL SENT:", result);

  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
  }
}

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("SOS ERROR:", error);
    res.status(500).json({ error: "Failed to send SOS" });
  }
});

// start server
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`💬 AI Chat server running on http://localhost:${PORT}`);
});
