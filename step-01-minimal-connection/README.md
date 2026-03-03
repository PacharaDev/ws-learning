# Step 01: Minimal Connection

- การ Handshake ระหว่าง Client และ Server 
- การ new Instance WebSocket ขึ้นมาจะต้องประกาศที่อยู่ใน argument เลยเท่านั้น ไม่สามารถใส่ค่าทีหลังได้
- Event `open` คือการเชื่อมต่อสำเร็จ
- Event `message` คือการได้รับข้อมูลจาก Server
- Event `close` คือการเชื่อมต่อถูกปิด
- เทคนิคการทำ Auto-scroll ด้วย scrollTop = scrollHeight
- การประกาศตัวแปรเพื่อเก็บค่า (State) เช่น count ต้องกำหนดค่าเริ่มต้นเสมอ (เช่น let count = 0) เพราะถ้าไม่กำหนดจะเป็น undefined และนำไปคำนวณต่อไม่ได้ (NaN)