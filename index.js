const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let idCounter = 1;

// GET semua todos
app.get("/api/todos", (req, res) => {
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos,
  });
});

// POST todo baru
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
    data: todos,
  });
});

// GET todo by ID
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

// PUT update todo
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

// DELETE todo
app.delete("/api/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json({
    status: "success",
    message: "Todo deleted successfully",
    data: deleted,
  });
});

// Untuk cek kalau API hidup
app.get("/", (req, res) => {
  res.send("Backend API berjalan di Cloud Run.");
});

// WAJIB pakai PORT dari Cloud Run
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

