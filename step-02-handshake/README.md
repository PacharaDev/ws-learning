# Step 02: Handshake Deep-Dive

### 🤝 Concept Handshake

- การที่ Client ขอยกระดับจาก **HTTP Request** ปกติเป็น **WebSocket Protocol**
- หัวใจสำคัญคือการตอบกลับด้วย HTTP Status **`101 Switching Protocols`** เพื่อบอกว่าประตูเปลี่ยนโหมดแล้ว

### 🔑 การคำนวณรหัสลับ (Challenge-Response)

- **Client:** จะสุ่ม `Sec-WebSocket-Key` ส่งไปท้าทาย Server
- **Server:** เอาคีย์มาคำนวณเข้าสูตรมาตรฐาน [(Key + MAGIC_GUID)](cci:1://file:///c:/Users/Pachara%20Nokroy/Desktop/learning/mastery/ws-learning/step-02-handshake/index.html:72:4-77:5) -> **SHA-1** -> **Base64**
- **เป้าหมาย:** เพื่อส่งกลับมาเช็คกับ Client ว่า _"Server นี้เล่นเป็นนะ (คุย WebSocket เป็นจริงๆ)"_ ถ้าส่งกลับไปผิด Browser จะไม่ยอมเชื่อใจและตัดการเชื่อมต่อทันที

### 🛡️ Browser Security & Headers

- **กฎเหล็กของ Browser:** เราไม่สามารถแก้ไข/เพิ่ม Header ของ WebSocket ได้เองผ่านสคริปต์หน้าเว็บ (ความปลอดภัย)
- **ทางออก:** หากต้องส่งข้อมูลยืนยันตัวตน (Validate) ให้ส่งผ่าน **URL (Query Parameters)** แทน ซึ่งเป็นวิธีที่ได้รับความนิยมที่สุด

### 🚪 Gatekeeper Strategy (ด่านตรวจ)

- เราทดลองสร้าง "ด่านตรวจ" ใน Server เพื่อเช็คค่า `vip-user` จาก URL
- **ประโยชน์:** ช่วยประหยัด RAM/CPU ของ Server เพราะเราสามารถ "ปฏิเสธ" (socket.destroy) คนไม่ได้รับเชิญทิ้งได้ทันทีตั้งแต่จังหวะขอ Handshake (ก่อนจะเปิดท่อ WebSocket จริง)
