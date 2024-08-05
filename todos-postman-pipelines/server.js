const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for todos
let todos = [];
let nextId = 1;

// CREATE a new todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = { id: nextId++, title, description: description || '' };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// READ a single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// UPDATE a todo by ID
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title) todo.title = title;
  if (description) todo.description = description;
  res.json(todo);
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1)[0];
  res.json(deletedTodo);
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
