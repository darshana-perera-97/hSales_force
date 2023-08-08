const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/get", (req, res) => {
  res.json("users");
});
app.get("/send", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
