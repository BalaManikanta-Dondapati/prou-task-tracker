const db = require('../db/db');

const Employee = {
  all: (cb) => db.all('SELECT * FROM employees ORDER BY id', cb),
  findById: (id, cb) => db.get('SELECT * FROM employees WHERE id = ?', [id], cb),
  create: (data, cb) => {
    const { name, role, email } = data;
    db.run('INSERT INTO employees (name, role, email) VALUES (?, ?, ?)', [name, role, email], function(err) {
      if (err) return cb(err);
      db.get('SELECT * FROM employees WHERE id = ?', [this.lastID], cb);
    });
  }
  // update & delete can be added later
};

module.exports = Employee;
