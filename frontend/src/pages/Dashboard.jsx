import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ total:0, completed:0, pending:0, inprogress:0 });

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get('/tasks');
        const tasks = res.data || [];
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const inprogress = tasks.filter(t => t.status === 'In Progress').length;
        const pending = tasks.filter(t => t.status === 'Pending').length;
        setCounts({ total, completed, pending, inprogress });
      } catch (err) {
        console.error(err);
      }
    }
    fetch();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Tasks</div>
          <div className="text-2xl font-bold">{counts.total}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold">{counts.completed}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-bold">{counts.inprogress}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold">{counts.pending}</div>
        </div>
      </div>
    </div>
  );
}
