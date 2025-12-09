
import React, { useEffect, useState } from 'react'
import Signup from './pages/signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const onUserChanged = () => {
      try {
        const raw = localStorage.getItem('user');
        if (raw) setUser(JSON.parse(raw));
        else setUser(null);
      } catch (err) {
        setUser(null);
      }
    };
    window.addEventListener('user-changed', onUserChanged);
    return () => window.removeEventListener('user-changed', onUserChanged);
  }, []);

  const handleSearch = (value) => setSearchQuery(value);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSearchQuery('');
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} onSearch={handleSearch} brand="Pad" />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
