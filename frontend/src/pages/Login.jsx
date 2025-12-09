import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
          const response = await axios.post(`${API_BASE}/api/auth/login`, {
            email,
            password
          });
          console.log('Login Successful:', response.data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
              // persist user info if returned by API
              if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
              } else if (response.data.name || response.data.username) {
                const u = { name: response.data.name || response.data.username };
                localStorage.setItem('user', JSON.stringify(u));
              }
              // notify app to update user state
              window.dispatchEvent(new Event('user-changed'));
              navigate('/');
            }
        } catch (error) {
        console.error('Login Error:', error);
        }
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)}
              id="email" 
              name="email" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password:
            </label>
            <input 
              type="password" 
                onChange={(e) => setPassword(e.target.value)} 
              id="password" 
              name="password" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition">Sign up here</a>
        </p>
      </div>
    </div>
  )
}

export default Login;