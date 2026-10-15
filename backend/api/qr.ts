import type { VercelRequest, VercelResponse } from "@vercel/node";
import { qrRoutes } from "../src/routes/qrRoutes.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configure CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL ?? "http://localhost:5173",
  );

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle the browser's preflight request
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("QR code generator backend is working!");

    return;
  }

  try {
    await qrRoutes(req, res);
  } catch (error) {
    console.error(error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
}
