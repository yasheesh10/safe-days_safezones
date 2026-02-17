import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient.js";
import { generateToken } from "../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();

// 🧠 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { identifier, password, userType } = req.body;
    if (!identifier || !password || !userType) {
      return res.status(400).json({
        error: "Missing required fields: identifier, password, userType",
      });
    }

const { data: user, error } = await supabase
  .from("profiles")
  .select("*")
  .or(
    `email.eq.${identifier},blockchain_id.eq.${identifier}`
  )
  .eq("role", userType)
  .maybeSingle();



    if (error) return res.status(500).json({ error: error.message });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.hashed_password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = generateToken({
      id: user.id,
      role: user.role,
      blockchainId: user.blockchain_id,
    });

    // Update last_login
    await supabase
      .from("profiles")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        role: user.role,
        blockchainId: user.blockchain_id,
        lastLogin: user.last_login,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// 🪄 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, userType = "tourist" } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, email, password" });
    }

    // Check if user exists
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (existing) return res.status(409).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const raw = uuidv4() + Date.now();
const hash = crypto.createHash("sha256").update(raw).digest("hex");

const blockchainId = `BLK-NE-${userType
  .toUpperCase()
  .substring(0, 4)}-${hash.substring(0, 24)}`;


    const { data: newUser, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: uuidv4(),
          name,
          email,
          identifier: email,
          role: userType,
          blockchain_id: blockchainId,
          hashed_password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        role: newUser.role,
        blockchainId: newUser.blockchain_id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
  console.error("🔥 REGISTER ERROR FULL:", err);
  res.status(500).json({
    error: err.message || err.toString(),
  });
}


});

// ✅ VERIFY TOKEN
router.get("/verify", async (req, res) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "ne-tourist-safety-secret-key-2025"
    );

    const { data: user } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", decoded.id)
      .maybeSingle();

    if (!user || !user.is_active)
      return res.status(401).json({ error: "Invalid token" });

    res.json({
      valid: true,
      user: {
        id: user.id,
        role: user.role,
        blockchainId: user.blockchain_id,
      },
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
