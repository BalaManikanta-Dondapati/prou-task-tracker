import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({name:'', role:'', email:''});
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => { api.get('/employees').then(r => setEmployees(r.data)).catch(e => console.error(e)); }, []);

  async function createEmployee(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to create employees.');
      return;
    }
    try {
      const res = await api.post('/employees', form);
      setEmployees(prev => [...prev, res.data]);
      setForm({name:'', role:'', email:''});
    } catch (err) { alert(err.response?.data?.error || err.message); }
  }

  return (
    <div>
      <h2 className="page-title">Employees</h2>

      {isAuthenticated ? (
        <form onSubmit={createEmployee} className="mb-4 form-row">
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="small" required/>
          <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="Role" className="small"/>
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="small"/>
          <button className="btn btn-primary">Add</button>
        </form>
      ) : (
        <div style={{marginBottom:12, color:'#6b7280'}}>Please <a href="/login">login</a> to add employees.</div>
      )}

      <div className="grid gap-3">
        {employees.map(emp => (
          <div key={emp.id} className="card" style={{display:'flex', justifyContent:'space-between', padding:'10px'}}>
            <div>
              <div style={{fontWeight:600}}>{emp.name}</div>
              <div style={{color:'#6b7280'}}>{emp.role} — {emp.email}</div>
            </div>
            <div style={{color:'#9ca3af'}}>#{emp.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
