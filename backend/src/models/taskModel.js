const db = require('../db/db');

const Task = {
  all: (filters, cb) => {
    let sql = 'SELECT tasks.*, employees.name as employee_name FROM tasks LEFT JOIN employees ON tasks.employee_id = employees.id';
    const conditions = [];
    const params = [];
    if (filters.status) { conditions.push('tasks.status = ?'); params.push(filters.status); }
    if (filters.employeeId) { conditions.push('tasks.employee_id = ?'); params.push(filters.employeeId); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY tasks.created_at DESC';
    db.all(sql, params, cb);
  },
  findById: (id, cb) => db.get('SELECT * FROM tasks WHERE id = ?', [id], cb),
  create: (data, cb) => {
    const { title, description, status = 'Pending', employee_id = null, due_date = null } = data;
    db.run(
      `INSERT INTO tasks (title, description, status, employee_id, due_date) VALUES (?, ?, ?, ?, ?)`,
      [title, description, status, employee_id, due_date],
      function(err) {
        if (err) return cb(err);
        db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], cb);
      }
    );
  },
  update: (id, data, cb) => {
    const fields = [];
    const params = [];
    if (data.title) { fields.push('title = ?'); params.push(data.title); }
    if (data.description) { fields.push('description = ?'); params.push(data.description); }
    if (data.status) { fields.push('status = ?'); params.push(data.status); }
    if (data.employee_id !== undefined) { fields.push('employee_id = ?'); params.push(data.employee_id); }
    if (data.due_date) { fields.push('due_date = ?'); params.push(data.due_date); }
    params.push(new Date().toISOString());
    fields.push('updated_at = ?');
    params.push(id);
    const sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
    db.run(sql, params, function(err) {
      if (err) return cb(err);
      db.get('SELECT * FROM tasks WHERE id = ?', [id], cb);
    });
  },
  delete: (id, cb) => db.run('DELETE FROM tasks WHERE id = ?', [id], cb)
};

module.exports = Task;
