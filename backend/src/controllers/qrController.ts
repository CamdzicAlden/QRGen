import type { IncomingMessage, ServerResponse } from "node:http";
import { generateQR } from "../services/qrService.js";
import { readRequestBody } from "../utils/readBody.js";

export const generateQRCode = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    const body = await readRequestBody(req);

    let data: unknown;

    try {
      data = JSON.parse(body);
    } catch {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Invalid JSON",
        }),
      );

      return;
    }

    if (
      typeof data !== "object" ||
      data === null ||
      !("url" in data) ||
      typeof data.url !== "string" ||
      data.url.trim() === ""
    ) {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "URL is required",
        }),
      );

      return;
    }

    const url = data.url.trim();

    try {
      new URL(url);
    } catch {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Invalid URL",
        }),
      );

      return;
    }

    const format =
      "format" in data && typeof data.format === "string" ? data.format : "svg";

    if (format !== "svg" && format !== "png") {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Format must be either svg or png",
        }),
      );

      return;
    }

    const qrCode = await generateQR(url, format);

    res.writeHead(200, {
      "Content-Type": qrCode.contentType,
      "Cache-Control": "no-store",
    });

    res.end(qrCode.data);
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Failed to generate QR code",
      }),
    );
  }
};
