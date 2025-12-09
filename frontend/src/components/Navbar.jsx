import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user = null, onLogin, onLogout, onSignup, onSearch, brand = 'Pad' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchQuery);
        else console.log('Search:', searchQuery);
    };

    const displayName = (user && (user.name || user.username || user.email)) ? (user.name || user.username || user.email) : '';
    const initials = displayName
        ? displayName.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()
        : null;

    const handleDefaultLogin = () => navigate('/login');
    const handleDefaultSignup = () => navigate('/register');
    const handleDefaultLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        if (onLogout) onLogout();
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">{brand}</div>
            </div>

            <div className="navbar-center">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        className="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search notes, users, and tags..."
                        aria-label="Search"
                    />
                    <button className="search-btn" type="submit">Search</button>
                </form>
            </div>

            <div className="navbar-right">
                {user ? (
                    <div className="navbar-user">
                        <div className="user-info">
                            <div className="user-avatar" title={displayName}>{initials}</div>
                            <span className="user-name">{displayName ? `Hi, ${displayName.split(' ')[0]}` : 'Hi'}</span>
                        </div>
                        <button
                            className="btn btn-logout"
                            onClick={() => onLogout ? onLogout() : console.log('logout')}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="navbar-buttons">
                        <button className="btn btn-login" onClick={() => onLogin ? onLogin() : handleDefaultLogin()}>Login</button>
                        <button className="btn btn-signup" onClick={() => onSignup ? onSignup() : handleDefaultSignup()}>Sign Up</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;