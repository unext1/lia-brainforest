const express = require("express");

const app = express();

app.get("/api/data", (req, res) => {
  const data = {
    message: "Hello, World!",
  };

  res.json(data);
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
