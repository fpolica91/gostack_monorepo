const express = require("express");
const app = express();
app.use(express.json());

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
  console.time("Request");
  console.log(`request made was ${req.method}`);
  console.timeEnd("Request");
  next();
});

// query params
app.get("/test", (req, res) => {
  const { name } = req.query;
  return res.json({ message: `welcome, ${name}` });
});

// req.params

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  return res.json({ message: `User id is ${id}` });
});

const users = [];

function checkUserExists(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ error: "Request cannot be empty" });
  }
  next();
}

app.post("/create", checkUserExists, (req, res) => {
  const { name, email } = req.body;
  users.push({ name, email });
  return res.json(users);
});

app.listen(5000);
