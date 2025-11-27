const db = require('../db/db');

const User = {
  create: (username, passwordHash, cb) => {
    db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash], function(err) {
      if (err) return cb(err);
      db.get('SELECT id, username, created_at FROM users WHERE id = ?', [this.lastID], cb);
    });
  },
  findByUsername: (username, cb) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], cb);
  },
  findById: (id, cb) => {
    db.get('SELECT id, username, created_at FROM users WHERE id = ?', [id], cb);
  }
};

module.exports = User;
