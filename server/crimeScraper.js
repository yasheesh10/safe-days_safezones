import axios from "axios";
import * as cheerio from "cheerio";
import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


// Mumbai neighbourhood coordinates lookup
const MUMBAI_LOCATIONS = {
  "colaba": { lat: 18.9067, lng: 72.8147 },
  "marine drive": { lat: 18.9440, lng: 72.8230 },
  "bandra": { lat: 19.0596, lng: 72.8295 },
  "andheri": { lat: 19.1307, lng: 72.8297 },
  "juhu": { lat: 19.1075, lng: 72.8263 },
  "powai": { lat: 19.1197, lng: 72.9051 },
  "kurla": { lat: 19.0728, lng: 72.8826 },
  "dharavi": { lat: 19.0413, lng: 72.8543 },
  "worli": { lat: 19.0096, lng: 72.8157 },
  "dadar": { lat: 19.0178, lng: 72.8478 },
  "malad": { lat: 19.1874, lng: 72.8484 },
  "borivali": { lat: 19.2307, lng: 72.8567 },
  "thane": { lat: 19.2183, lng: 72.9781 },
  "goregaon": { lat: 19.1663, lng: 72.8526 },
  "kandivali": { lat: 19.2051, lng: 72.8520 },
  "lower parel": { lat: 18.9933, lng: 72.8259 },
  "santacruz": { lat: 19.0815, lng: 72.8422 },
  "vile parle": { lat: 19.0990, lng: 72.8490 },
  "chembur": { lat: 19.0522, lng: 72.8993 },
  "mulund": { lat: 19.1726, lng: 72.9562 },
  "vikhroli": { lat: 19.1075, lng: 72.9244 },
  "ghatkopar": { lat: 19.0863, lng: 72.9089 },
  "matunga": { lat: 19.0278, lng: 72.8639 },
  "wadala": { lat: 19.0176, lng: 72.8562 },
  "sion": { lat: 19.0411, lng: 72.8646 },
  "gateway of india": { lat: 18.9220, lng: 72.8347 },
  "csmt": { lat: 18.9400, lng: 72.8356 },
  "fort": { lat: 18.9340, lng: 72.8356 },
  "churchgate": { lat: 18.9322, lng: 72.8264 },
  "govandi": { lat: 19.0606, lng: 72.9252 },
"mumbai": { lat: 19.0760, lng: 72.8777 }, // fallback to city center
"central mumbai": { lat: 19.0760, lng: 72.8777 },
"mira road": { lat: 19.2815, lng: 72.8654 },
"bhiwandi": { lat: 19.2967, lng: 73.0631 },
"navi mumbai": { lat: 19.0330, lng: 73.0297 },
"vasai": { lat: 19.3608, lng: 72.8178 },
"nalasopara": { lat: 19.4162, lng: 72.7956 },
"kharghar": { lat: 19.0477, lng: 73.0698 },
"panvel": { lat: 18.9894, lng: 73.1175 },
"dombivli": { lat: 19.2183, lng: 73.0894 },
"kalyan": { lat: 19.2437, lng: 73.1355 },
"ulhasnagar": { lat: 19.2167, lng: 73.1667 },
"murbad": { lat: 19.2500, lng: 73.3833 },
"badlapur": { lat: 19.1667, lng: 73.2500 },
};

// Scrape headlines from Times of India Mumbai crime section
async function scrapeNewsHeadlines() {
  try {
const { data } = await axios.get(
  "https://timesofindia.indiatimes.com/topic/mumbai-crime/news",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        timeout: 10000,
      }
    );

    const $ = cheerio.load(data);
    const headlines = [];

    // Extract article headlines
$("a, h2, h3, .article-txt, .list-item").each((_, el) => {
  const text = $(el).text().trim();
  if (text.length > 40 && text.length < 300) {
    headlines.push(text);
  }
});

    // Return unique headlines, max 20
    return [...new Set(headlines)].slice(0, 20);
  } catch (err) {
    console.error("Scraping error:", err.message);
    return [];
  }
}

// Use Gemini to extract crime info from headlines
async function extractCrimeInfo(headlines) {
  if (headlines.length === 0) return [];

  const prompt = `You are analyzing Mumbai crime news headlines.
For each headline that describes a crime in Mumbai, extract the area and crime type.
Headlines:
${headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}

Respond ONLY with a JSON array like:
[{"headline": 1, "area": "bandra", "crime_type": "theft"}]
Only include Mumbai crimes. Skip anything not crime-related or not in Mumbai.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];
    return JSON.parse(jsonMatch[0]);

  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    return [];
  }
}

// Insert extracted crimes into Supabase
async function insertCrimeIncidents(crimes) {
  if (crimes.length === 0) return;

  // Get a system user id for scraper-inserted incidents
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .limit(1)
    .single();

  if (!profile) {
    console.error("No profile found for inserting incidents");
    return;
  }

  for (const crime of crimes) {
    const location = MUMBAI_LOCATIONS[crime.area.toLowerCase()];

    if (!location) {
      console.log(`Unknown area: ${crime.area}, skipping`);
      continue;
    }

    // Check if similar incident already inserted in last 6 hours (avoid duplicates)
    const { data: existing } = await supabase
      .from("incidents")
      .select("id")
      .eq("city", "mumbai")
      .eq("type", crime.crime_type)
      .gte("created_at", new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString())
      .ilike("description", `%${crime.area}%`)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(`Duplicate skipped: ${crime.area} - ${crime.crime_type}`);
      continue;
    }

    const { error } = await supabase.from("incidents").insert({
      user_id: profile.id,
      type: crime.crime_type,
      description: `News report: ${crime.crime_type} in ${crime.area}`,
      latitude: location.lat,
      longitude: location.lng,
      city: "mumbai",
      status: "active",
    });

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log(`✅ Inserted: ${crime.crime_type} in ${crime.area}`);
    }
  }
}

// Main scraper function
async function runScraper() {
  console.log("🔍 Running crime scraper...", new Date().toLocaleString());

  const headlines = await scrapeNewsHeadlines();
  console.log(`📰 Found ${headlines.length} headlines`);

  const crimes = await extractCrimeInfo(headlines);
  console.log(`🚨 Extracted ${crimes.length} crimes`);

  await insertCrimeIncidents(crimes);
  console.log("✅ Scraper run complete");
}

// Run every 4 hours
cron.schedule("0 */4 * * *", runScraper);

// Also run once immediately on startup
runScraper();

export { runScraper };