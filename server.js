// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3001;

http
  .createServer((req, res) => {
    let filePath = "." + (req.url === "/" ? "/index.html" : req.url);
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
    };

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
      } else {
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
        res.end(content, "utf-8");
      }
    });
  })
  .listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`),
  );
