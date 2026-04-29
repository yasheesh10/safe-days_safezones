import express from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-sos-alert", async (req, res) => {
  const { contacts, locationLink } = req.body;

  console.log("🚨 SOS HIT - contacts:", JSON.stringify(contacts));
  console.log("🚨 locationLink:", locationLink);

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sawantyash1011@gmail.com", // 🔥 TEMP TEST
      subject: "🚨 Emergency Alert",
      html: `
        <h2>🚨 Emergency Alert</h2>
        <p>The user has triggered an SOS.</p>
        <a href="${locationLink}">${locationLink}</a>
      `,
    });

    console.log("✅ EMAIL SENT:", result);

    res.json({ success: true });

  } catch (err) {
    console.error("❌ SOS ERROR:", err);
    res.status(500).json({ error: "Failed to send alerts" });
  }
});

export default router;