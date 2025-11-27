require('dotenv').config();
const db = require('./db');

const createTables = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK(status IN ('Pending','In Progress','Completed')) DEFAULT 'Pending',
  employee_id INTEGER,
  due_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE SET NULL
);
`;

db.serialize(() => {
  db.exec(createTables, (err) => {
    if (err) {
      console.error('Migration error:', err);
      process.exit(1);
    }
    console.log('Migrations applied.');
    process.exit(0);
  });
});
