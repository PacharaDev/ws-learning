const http = require("http");
const crypto = require("crypto");
const { WebSocketServer } = require("ws");

// GUID มาตรฐานของ WebSocket Protocol (RFC 6455)
// ค่านี้ถูกกำหนดไว้ตายตัวในมาตรฐาน ไม่มีใครเปลี่ยนได้
const WS_MAGIC_GUID = "258EAFA5-E914-47DA-95CA-5AB5ACA82C11";

// สร้าง HTTP Server ธรรมดาก่อน
const server = http.createServer();

// สร้าง WebSocket Server แต่ไม่ให้มันเปิด port เอง (noServer: true)
// เราจะจัดการ upgrade เองเพื่อดู header ก่อนแล้วค่อยส่งต่อให้ ws library
const wss = new WebSocketServer({ noServer: true });

// ดักฟัง Event 'upgrade' — จุดนี้คือจังหวะที่ Client ขอเปลี่ยนท่อจาก HTTP เป็น WebSocket
server.on("upgrade", (req, socket, head) => {
  console.log("\n===== HANDSHAKE REQUEST (Client -> Server) =====");
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log("Headers:");

  for (const [key, value] of Object.entries(req.headers)) {
    console.log(`  ${key}: ${value}`);
  }

  // หยิบ Sec-WebSocket-Key ที่ Client สุ่มสร้างมา
  const clientKey = req.headers["sec-websocket-key"];
  console.log(`\nClient Key: ${clientKey}`);

  // คำนวณ Accept Key ตาม RFC 6455:
  // สูตร: Base64( SHA-1( clientKey + MAGIC_GUID ) )
  const acceptKey = crypto
    .createHash("sha1")
    .update(clientKey + WS_MAGIC_GUID)
    .digest("base64");

  console.log(`Computed Accept Key: ${acceptKey}`);
  console.log("\n===== HANDSHAKE RESPONSE (Server -> Client) =====");
  console.log("HTTP/1.1 101 Switching Protocols");
  console.log("Upgrade: websocket");
  console.log("Connection: Upgrade");
  console.log(`Sec-WebSocket-Accept: ${acceptKey}`);
  console.log("\nHandshake complete! Protocol upgraded to WebSocket.\n");

  // ส่งต่อให้ ws library จัดการ handshake จริงๆ
  // (เราแค่ดักอ่าน header ก่อนเท่านั้น)
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

// หลังจาก handshake สำเร็จ ws library จะส่ง event 'connection' มา
wss.on("connection", (ws) => {
  ws.send("Handshake successful! You are now connected via WebSocket.");

  ws.on("message", (data) => {
    console.log(`Received: ${data}`);
    ws.send(`Echo: ${data}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected.\n");
  });
});

server.listen(8080, () => {
  console.log("Server is running on ws://localhost:8080");
  console.log("Waiting for WebSocket upgrade request...\n");
});
