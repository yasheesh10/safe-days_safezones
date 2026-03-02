import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/send-sos-alert", async (req, res) => {
  const { contacts, locationLink } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alizaskh7@gmail.com",
        pass: "rknaeesssuzestzu",
      },
    });

    for (const contact of contacts) {
      await transporter.sendMail({
        from: '"SAFE DAYS SOS" <alizaskh7@gmail.com>',
        to: contact.phone,
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