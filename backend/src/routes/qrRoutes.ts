import type { IncomingMessage, ServerResponse } from "node:http";
import { generateQRCode } from "../controllers/qrController.js";

export async function qrRoutes(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method === "POST" && req.url === "/api/qr") {
    await generateQRCode(req, res);
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("QR code generator backend is working!");

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      error: "Route not found",
    }),
  );
}
