import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <header className="site-header">
          <div className="container clearfix">
            <h1 className="site-title">ProU Task Tracker</h1>
            <nav className="site-nav" aria-label="Main navigation">
              <Link to="/">Dashboard</Link>
              <Link to="/employees">Employees</Link>
              <Link to="/tasks">Tasks</Link>
              {user ? (
                <>
                  <span style={{marginLeft:12, marginRight:6}}>{user.username}</span>
                  <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.reload(); }} className="btn-ghost" style={{marginLeft:8}}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
