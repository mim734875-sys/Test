import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).send("Method Not Allowed");

  const { code } = req.body;

  if (!code) return res.status(400).send("Missing code");

  // Tạo ID random
  const id = Math.random().toString(36).substring(2, 10);

  // Lưu vào KV
  await kv.set(`script:${id}`, code);

  // trả link raw
  const link = `${req.headers.origin}/api/raw/${id}`;

  return res.status(200).json({ link });
}