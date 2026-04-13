import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-sos-alert", async (req, res) => {
  const { contacts, locationLink } = req.body;
  console.log("🚨 SOS HIT - contacts:", JSON.stringify(contacts));
  console.log("🚨 locationLink:", locationLink);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sawantyash1011@gmail.com",
        pass: "oczovjyrygwpzjir",
      },
    });

    for (const contact of contacts) {
      await transporter.sendMail({
        from: '"SAFE DAYS SOS" <sawantyash1011@gmail.com>',
        to: contact.email,
        subject: "🚨 Emergency Alert",
        html: `
          <h2>🚨 Emergency Alert</h2>
          <p>The user has triggered an SOS.</p>
          <p><strong>Track live location:</strong></p>
          <a href="${locationLink}">${locationLink}</a>
        `,
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("SOS ALERT ERROR:", err);
    res.status(500).json({ error: "Failed to send alerts" });
  }
});
export default router;