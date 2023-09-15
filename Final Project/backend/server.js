const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const users = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
];

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json(users);
});
app.get("/data", (req, res) => {
  console.log(req.body);
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
