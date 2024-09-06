const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const sqlite3 = require('sqlite3');

 

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// Create the table
const createTable = () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS todo (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           title TEXT NOT NULL,
           description  TEXT NOT NULL,
           priority TEXT NOT NULL
      )
  `;
  db.prepare(sql).run();
};

createTable();




// Insert a new user
app.post('/todo', (req, res) => {
  const { title, description, priority } = req.body;

  const insertStatement = db.prepare(
    'INSERT INTO todo (title, description, priority) VALUES (?, ?, ?)'
  );

  insertStatement.run(title, description, priority); 

 
  // Run the SQL statement with the provided values
  // db.run(sql, [title, description, priority], (err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: 'Failed to add todo' }); 
  //   } else {
  //     res.status(201).json({ message: 'Todo added successfully' });
  //     db.run('COMMIT'); // Commit the transaction 
  //   }
  // });
});

// Get all users
app.get('/todo', (req, res) => {
  const sql = `
      SELECT * FROM todo
  `;
  const rows = db.prepare(sql).all();
  res.json(rows);
});

// Get a user by id
app.get('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT * FROM todo
      WHERE id = ?
  `;
  const row = db.prepare(sql).get(id);
  if (row) {
      res.json(row);
  } else {
      res.status(404).json({ error: 'Todo not found' });
  }
});

// Update a user by id
app.put('/todo/:id', (req, res) => {
  const { id } = req.params;
  const {title, description, priority  } = req.body;
  const sql = `
      UPDATE todo
      SET title = ?, description = ?, priority = ?
      WHERE id = ?
  `;
  const info = db.prepare(sql).run(title, description,priority, id);
  if (info.changes > 0) {
      res.json({ message: 'todo updated successfully' });
  } else {
      res.status(404).json({ error: 'todo not found' });
  }
});



// Delete a user by id
app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      DELETE FROM todo
      WHERE id = ?
  `;
  const info = db.prepare(sql).run(id);
  if (info.changes > 0) {
      res.json({ message: 'User deleted successfully' });
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
