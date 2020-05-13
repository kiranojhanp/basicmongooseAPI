const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/taskManagerMarch2020", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database server");
  });

// for json support
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

/* Simple restful API */

app.get("/task", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(201).json(tasks);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/task", (req, res) => {
  Task.create(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/task", (req, res) => {
  res.status(401).send("NOT SUPPORTED");
});

app.delete("/task", (req, res) => {
  Task.deleteMany()
    .then((reply) => {
      res.json(reply);
    })
    .catch((err) => console.log(err));
});

/* Restful API with id */

app.get("/task/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((err) => console.log(err));
});

app.post("/task/:id", (req, res) => {
  res.status(401).send("NOT SUPPORTED");
});

app.put("/task/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (req.body.name) {
        task.name = req.body.name;
      }

      task.done = req.body.done;

      task.save().then((updatedTask) => {
        res.json(updatedTask);
      });
    })
    .catch((err) => console.log(err));
});

app.delete("/task/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then((reply) => {
      res.json(reply);
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("Server is running at localhost:3000");
});
