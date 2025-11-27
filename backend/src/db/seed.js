require('dotenv').config();
const db = require('./db');

const seed = `
INSERT OR IGNORE INTO employees (id, name, role, email) VALUES
 (1, 'Alice Johnson', 'Product Manager', 'alice@prou.test'),
 (2, 'Bob Kumar', 'Developer', 'bob@prou.test'),
 (3, 'Clara Singh', 'Designer', 'clara@prou.test');

INSERT OR IGNORE INTO tasks (id, title, description, status, employee_id, due_date) VALUES
 (1, 'Design landing page', 'Create initial hero section designs', 'In Progress', 3, '2025-12-05'),
 (2, 'API skeleton', 'Set up Express server and routes', 'Completed', 2, '2025-11-28'),
 (3, 'Product spec', 'Write product feature spec', 'Pending', 1, '2025-12-10');
`;

db.serialize(() => {
  db.exec(seed, (err) => {
    if (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
    console.log('Seed data inserted.');
    process.exit(0);
  });
});
