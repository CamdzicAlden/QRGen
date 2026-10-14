import type { IncomingMessage, ServerResponse } from "node:http";

import { qrRequestSchema } from "../schemas/qrSchema.js";
import { createQRPayload } from "../utils/qrPayload.js";
import { generateQR } from "../services/qrService.js";
import { readRequestBody } from "../utils/readBody.js";

export const generateQRCode = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  try {
    const body = await readRequestBody(req);

    let rawData: unknown;

    try {
      rawData = JSON.parse(body);
    } catch {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(
        JSON.stringify({
          message: "Invalid JSON request body",
        }),
      );

      return;
    }

    // Support the request contract directly.
    // The optional wrapper also allows older clients to send { formData }.
    let candidate: unknown = rawData;

    if (
      typeof rawData === "object" &&
      rawData !== null &&
      "formData" in rawData
    ) {
      candidate = rawData.formData;
    }

    // Validate and apply Zod defaults.
    const validation = qrRequestSchema.safeParse(candidate);

    if (!validation.success) {
      res.writeHead(400, {
        "Content-Type": "application/json; charset=utf-8",
      });

      res.end(
        JSON.stringify({
          message: "Invalid QR code request",
          errors: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        }),
      );

      return;
    }

    const data = validation.data;

    // Convert the validated input to the correct QR payload.
    const payload = createQRPayload(data);

    // Generate the requested image.
    const qrCode = await generateQR(payload, data);

    // Return the image itself, not JSON.
    res.writeHead(200, {
      "Content-Type": qrCode.contentType,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });

    res.end(qrCode.data);
  } catch (error) {
    console.error("QR generation failed:", error);

    if (!res.headersSent) {
      res.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8",
      });
    }

    res.end(
      JSON.stringify({
        message: "Failed to generate QR code",
      }),
    );
  }
};
