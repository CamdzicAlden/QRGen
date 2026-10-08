import http from "node:http";
import { qrRoutes } from "./routes/qrRoutes.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
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
