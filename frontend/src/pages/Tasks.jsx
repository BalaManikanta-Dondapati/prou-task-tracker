import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TaskRow({t, onUpdate, onDelete, isAuth}) {
  return (
    <div className="task-row card" style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'center'}}>
      <div className="task-info">
        <div className="task-title">{t.title}</div>
        <div className="task-desc">{t.description}</div>
        <div className="task-meta-small">{t.employee_name ? `Assignee: ${t.employee_name}` : 'Unassigned'}</div>
      </div>
      <div className="task-meta">
        <div style={{marginRight:12}}>{t.status}</div>
        {isAuth ? (
          <>
            <button onClick={() => onUpdate(t.id, t.status==='Completed' ? 'Pending' : 'Completed')} className="small green">Toggle</button>
            <button onClick={() => onDelete(t.id)} className="small" style={{background:'#ef4444', color:'white'}}>Delete</button>
          </>
        ) : (
          <div style={{fontSize:13, color:'#6b7280'}}>Login to modify</div>
        )}
      </div>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({status:'', employeeId:''});
  const [form, setForm] = useState({title:'', description:'', status:'Pending', employee_id: ''});
  const isAuthenticated = !!localStorage.getItem('token');

  async function load() {
    try {
      const res = await api.get('/tasks', { params: { ...(filters.status ? {status:filters.status} : {}), ...(filters.employeeId ? {employeeId: filters.employeeId} : {}) }});
      setTasks(res.data || []);
    } catch (err) { console.error(err); }
  }

  useEffect(() => {
    load();
    api.get('/employees').then(r=>setEmployees(r.data)).catch(e=>console.error(e));
  }, []);

  async function applyFilter(e) {
    e.preventDefault();
    load();
  }

  async function createTask(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to create tasks.');
      return;
    }
    try {
      const payload = {...form, employee_id: form.employee_id || null};
      await api.post('/tasks', payload);
      setForm({title:'', description:'', status:'Pending', employee_id:''});
      load();
    } catch (err) { alert(err.response?.data?.error || err.message); }
  }

  async function updateTask(id, newStatus) {
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      load();
    } catch (err) { console.error(err); }
  }

  async function deleteTask(id) {
    if (!confirm('Delete task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      load();
    } catch (err) { console.error(err); }
  }

  return (
    <div>
      <h2 className="page-title">Tasks</h2>

      <form onSubmit={applyFilter} className="form-row" style={{marginBottom:12}}>
        <select value={filters.status} onChange={e=>setFilters({...filters, status:e.target.value})} className="small gray">
          <option value="">All statuses</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select value={filters.employeeId} onChange={e=>setFilters({...filters, employeeId:e.target.value})} className="small gray">
          <option value=''>All employees</option>
          {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
        </select>
        <button className="btn btn-ghost">Apply</button>
      </form>

      {isAuthenticated ? (
        <form onSubmit={createTask} className="form-row" style={{marginBottom:12}}>
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" className="small" required/>
          <input value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="small"/>
          <select value={form.employee_id} onChange={e=>setForm({...form, employee_id: e.target.value})} className="small">
            <option value=''>Assign (optional)</option>
            {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
          </select>
          <button className="btn btn-primary">Create Task</button>
        </form>
      ) : (
        <div style={{marginBottom:12, color:'#6b7280'}}>Please <a href="/login">login</a> to create, update or delete tasks.</div>
      )}

      <div>
        {tasks.map(t => <TaskRow key={t.id} t={t} onUpdate={updateTask} onDelete={deleteTask} isAuth={isAuthenticated} />)}
      </div>
    </div>
  );
}
