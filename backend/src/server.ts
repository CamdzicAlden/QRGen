import http from "node:http";

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("QR code generator backend is working!");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
