const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let idCounter = 1;

app.get("/api/todos", (req, res) => {
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos,
  });
});

app.post("/api/todos", (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = {
    id: idCounter++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.status(201).json({
    status: "success",
    message: "Todo added successfully",
    data: newTodo,
  });
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todo,
  });
});

app.put("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  const { title, description, dueDate, completed } = req.body;
  todos[index] = {
    ...todos[index],
    title,
    description,
    dueDate,
    completed,
  };

  res.json({
    status: "success",
    message: "Todo updated successfully",
    data: todos[index],
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  todos.splice(index, 1);
  res.json({
    status: "success",
    message: "Todo deleted successfully",
    data: null,
  });
});

app.get("/", (req, res) => {
  res.send("Backend API berjalan di Cloud Run.");
});

app.listen(port, () => {
  console.log(Server berjalan di port ${port});
});
