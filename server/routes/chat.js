import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      reply: data.response || "No response from AI"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "AI server error"
    });
  }
});

export default router;
