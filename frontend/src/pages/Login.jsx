import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user || {}));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="container">
      <h2 className="page-title">Login</h2>
      <form onSubmit={submit} className="card" style={{maxWidth:420}}>
        <div style={{marginBottom:8}}>
          <input placeholder="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required style={{width:'100%', padding:8}} />
        </div>
        <div style={{marginBottom:8}}>
          <input type="password" placeholder="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required style={{width:'100%', padding:8}} />
        </div>
        {error && <div style={{color:'crimson', marginBottom:8}}>{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
