const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


 

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

// REGISTER TABLE
const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `;
  db.prepare(sql).run();
};

createUserTable();


// Insert a new user
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if the email already exists
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user
  const insertStatement = db.prepare(
    'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)'
  );
  insertStatement.run(firstName, lastName, email, hashedPassword);

  res.status(201).json({ message: 'User registered successfully' });
});


// Get all users
app.get('/users', (req, res) => {
  const sql = `SELECT * FROM users`;
  const rows = db.prepare(sql).all();
  res.json(rows);
});

// Get a user by email
app.get('/users/:email', (req, res) => {
  const { email } = req.params;
  const sql = `SELECT * FROM users WHERE email = ?`;
  const row = db.prepare(sql).get(email);
  if (row) {
    res.json(row);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
// END OF register

//LOGIN PAGE


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});
//end of login page


// Insert a new user
app.post('/todo', (req, res) => {
  const { title, description, priority } = req.body;

  const insertStatement = db.prepare(
    'INSERT INTO todo (title, description, priority) VALUES (?, ?, ?)'
  );

  insertStatement.run(title, description, priority); 

 
  
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
