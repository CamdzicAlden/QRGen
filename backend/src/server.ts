import http from "node:http";
import { qrRoutes } from "./routes/qrRoutes.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Configure CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  //  Handle the browser's preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    await qrRoutes(req, res);
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        error: "Internal server error",
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
