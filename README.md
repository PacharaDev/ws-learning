# WebSocket Mastery: The Engineering Path

เป้าหมายของ repo นี้คือทำความเข้าใจ WebSocket ตั้งแต่ระดับ byte จนถึงการออกแบบระบบ real-time ที่เอาไปใช้งานจริงได้
ไม่ใช่แค่เรียกใช้ library แล้วจบ — แต่ต้องเข้าใจว่าข้างใต้มันทำงานยังไง

## โครงสร้างแต่ละ Step

แยกโฟลเดอร์ตาม step ข้างในมี:

- `server.js` — ฝั่ง server ใช้ Node.js + library `ws` (เลือกตัวนี้เพราะมันใกล้ native ที่สุด ไม่มี abstraction ซ่อน)
- `index.html` — client สำหรับทดสอบ
- `README.md` — จดสิ่งที่เรียนรู้ได้จริง คำถามที่เกิดขึ้น และสิ่งที่ยังไม่เข้าใจ

---

## Roadmap

### Phase 1: สายมันเชื่อมกันยังไง?

เริ่มจากเข้าใจว่า connection เกิดขึ้นและจบลงอย่างไร ก่อนจะไปทำอะไรซับซ้อน

- [ ] **Step 01: Minimal Connection** — ต่อให้ติดก่อน เห็น event `open` กับ `message` ให้ได้
- [ ] **Step 02: Handshake Deep-Dive** — ดูว่า `Sec-WebSocket-Key` กับ `Accept` มันคำนวณยังไง ทำไมต้องมี
- [ ] **Step 03: Data Framing** — ข้อมูลถูกห่อเป็น frame ยังไง, opcode คืออะไร, FIN bit ทำหน้าที่อะไร
- [ ] **Step 04: Close Handshake** — connection ปิดตัวยังไง, close code ต่างๆ (1000, 1006, 1011) หมายความว่าอะไร, "ปิดสวย" vs "สายหลุด" ต่างกันยังไง

### Phase 2: ทำให้มันเสถียร

จัดการกับความจริงที่ว่าเน็ตมันไม่เคยเสถียร 100%

- [ ] **Step 05: Heartbeat & Ghost Connections** — ทำ ping/pong เตะ connection ที่ค้างทิ้ง
- [ ] **Step 06: Reconnection + Offline Queue** — client ต่อใหม่เองได้ ใช้ exponential backoff ไม่รัว server, แล้วถ้ามี message ระหว่างสายหลุดจะจัดการยังไง
- [ ] **Step 07: State & Session** — server จำได้ว่าใครเป็นใคร จัดการ active client list

### Phase 3: ออกแบบการสื่อสารให้ดี

พอต่อสายได้แล้ว ก็ต้องคุยกันให้เป็นระบบ

- [ ] **Step 08: JSON & Validation** — ส่ง object ยังไง ถ้าข้อมูลผิด format จะจัดการยังไง
- [ ] **Step 09: Broadcasting & Rooms** — แยกกลุ่มผู้รับ เช่น ห้อง A ไม่เห็นข้อความห้อง B
- [ ] **Step 10: Binary Transfer** — ลองส่งไฟล์/รูปผ่าน buffer ดูว่าต่างจาก JSON string ยังไง
- [ ] **Step 11: Backpressure** — ถ้า server ยิงเร็วกว่า client รับไหว จะเกิดอะไร, ลอง `bufferedAmount`

### Phase 4: เตรียมใช้งานจริง

ความปลอดภัย + scaling

- [ ] **Step 12: Auth & TLS** — เช็ค token ตั้งแต่ตอน handshake + ตั้ง `wss://` เพราะส่ง token ผ่าน plaintext ไม่ make sense
- [ ] **Step 13: Security** — CSWSH คืออะไร, origin validation, rate limiting
- [ ] **Step 14: Scaling with Redis Pub/Sub** — ลงมือทำ Docker Compose จริง: 2 Node servers + 1 Redis ให้คน server 1 คุยกับ server 2 ได้

---

## วัดผลยังไง

- อธิบาย HTTP vs WebSocket ได้ถึงระดับ layer 4/7
- เขียน reconnection + offline queue เองได้ ไม่พึ่ง library สำเร็จรูป
- รู้ว่าเมื่อไหร่ควรใช้ WebSocket เมื่อไหร่แค่ HTTP/SSE ก็พอ
- debug WebSocket ผ่าน DevTools (Network > WS tab) ได้คล่อง
- ออกแบบระบบ real-time แบบ multi-server ได้ (อย่างน้อยในระดับ concept)
