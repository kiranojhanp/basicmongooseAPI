const express = require("express");

const app = express();

// for json support
app.use(express.json());

/* Simple restful API */

app.get("/", (req, res) => {
  res.send("Welcome to my app man");
});

app.get("/todo", (req, res) => {
  res.send("Send all todos");
});

app.post("/todo", (req, res) => {
  console.log(req.body.desc);
  
  res.send("Should create a new todo");
});

app.put("/todo", (req, res) => {
  res.status(401).send("NOT SUPPORTED");
});

app.delete("/todo", (req, res) => {
  res.send("Delete all todos");
});

/* Restful API with id */

app.get("/todo/:id", (req, res) => {
  res.send("Send a todo with id " + req.params.id);
});

app.post("/todo/:id", (req, res) => {
  res.status(401).send("NOT SUPPORTED");
});

app.put("/todo/:id", (req, res) => {
  res.send(`Update the todo with id ${req.params.id}`);
});

app.delete("/todo/:id", (req, res) => {
  res.send(`Deleted the todo with id ${req.params.id}`);
});

app.listen(3000, () => {
  console.log("Server is running at localhost:3000");
});
