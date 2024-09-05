// server.js
const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Create the todos table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    home TEXT,
    work TEXT,
    other TEXT
  )
`);

// GET all todos
app.get('/todo', (req, res) => {
  const sql = 'SELECT * FROM todos';
  const todos = db.prepare(sql).all();
  res.json(todos);
});

// POST a new todo
app.post('/todo', (req, res) => {
  const { home, work, other } = req.body;
  const sql = 'INSERT INTO todos (home, work, other) VALUES (?, ?, ?)';
  const todo = db.prepare(sql).run(home, work, other);
  res.status(201).json({ id: todo.lastInsertRowID });
});

// DELETE a todo
app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.prepare(sql).run(id);
  res.status(204).send();
});

// UPDATE a todo
app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const { home, work, other } = req.body;
  const sql = 'UPDATE todos SET home = ?, work = ?, other = ? WHERE id = ?';
  db.prepare(sql).run(home, work, other, id);
  res.status(200).send();
});

app.listen(5000, () => {
  console.log('Your server is running on http://localhost:5000');
});