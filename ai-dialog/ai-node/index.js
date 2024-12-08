const express = require("express");
const app = express();
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.post("/events", (req, res) => {
  // 设置响应头以启动事件源流
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let counter = 0;
  console.log("Received message:", req.body);

  // 模拟每秒发送数据的事件流
  const interval = setInterval(() => {
    counter++;
    const data = JSON.stringify({
      text: `你说的是: ${req.body?.message}.....${counter}`,
      counter,
      type: "message",
    });
    res.write(`data: ${data}\n\n`);
  }, 1000);

  // 监听连接关闭事件，清理资源
  req.on("close", () => {
    setTimeout(() => {
      clearInterval(interval);
      res.end();
    }, 10000);
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
