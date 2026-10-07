import http from "node:http";
import QRCode from "qrcode";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Health check
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("QR code generator backend is working!");
    return;
  }

  // QR code endpoint
  if (req.method === "POST" && req.url === "/api/qr") {
    try {
      const body = await readRequestBody(req);

      const data = JSON.parse(body);

      if (typeof data.url !== "string" || data.url.trim() === "") {
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

      // Validate URL
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

      const format = data.format ?? "svg";

      // Generate SVG
      if (format === "svg") {
        const svg = await QRCode.toString(url, {
          type: "svg",
          errorCorrectionLevel: "M",
          margin: 2,
          width: 300,
        });

        res.writeHead(200, {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-store",
        });

        res.end(svg);

        return;
      }

      // Generate PNG
      if (format === "png") {
        const png = await QRCode.toBuffer(url, {
          type: "png",
          errorCorrectionLevel: "M",
          margin: 2,
          width: 300,
        });

        res.writeHead(200, {
          "Content-Type": "image/png",
          "Cache-Control": "no-store",
        });

        res.end(png);

        return;
      }

      // Unsupported format
      res.writeHead(400, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          error: "Format must be either svg or png",
        }),
      );

      return;
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

      return;
    }
  }

  // Route not found
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      error: "Route not found",
    }),
  );
});

function readRequestBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
