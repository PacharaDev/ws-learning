const { WebSocketServer } = require("ws");

// 1. สร้าง WebSocket Server ที่ Port 8080
const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket Server is running on ws://localhost:8080");

// 2. ฟัง Event 'connection' (เกิดขึ้นเมื่อมี Client ต่อเข้ามา)
wss.on("connection", (ws) => {
  console.log("New client connected!");

  // 3. ส่งข้อความต้อนรับไปหา Client ทันทีที่ต่อติด
  ws.send("Hello from Server! Welcome to Step 01.");

  let count = 0;
  // 4. ฟัง Event 'message' (เกิดขึ้นเมื่อ Client ส่งข้อมูลมา)
  ws.on("message", (data) => {
    console.log(`Received message: ${data}`);
    count++;
    // ส่งข้อมูลกลับไปยืนยันว่าได้รับแล้ว (Echo)
    ws.send(`Server received your: "${data}" (${count} times)`);
  });

  // 5. ฟัง Event 'close' (เกิดขึ้นเมื่อ Client ตัดการเชื่อมต่อ)
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
