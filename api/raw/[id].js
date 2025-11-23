import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const { id } = req.query;

  const code = await kv.get(`script:${id}`);
  if (!code) return res.status(404).send("Not found");

  // Kiểm tra user-agent để chặn browser
  const ua = req.headers["user-agent"] || "";
  const blocked = [
    "Mozilla", "Chrome", "Safari", "Edge", "Opera", "Firefox"
  ];

  // Nếu UA trùng browser → chặn
  if (blocked.some(x => ua.includes(x))) {
    return res.status(403).send("Access Denied");
  }

  res.setHeader("Content-Type", "text/plain");
  return res.send(code);
}