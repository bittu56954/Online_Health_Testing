import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Pill,
  Home,
  LayoutDashboard,
  Info,
  Mail,
  User,
  ShieldAlert,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Sun,
  Moon,
  Stethoscope
} from 'lucide-react';

import bittuKumarImg from '../../assets/bittu_kumar.jpg';

const Navbar = () => {
  const { isAuthenticated, user, logoutUser, isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav
        className="navbar"
        style={{
          background: 'var(--bg-surface-glass)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          transition: 'background 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div
          className="nav-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Brand Logo with Bittu Kumar Avatar Photo */}
          <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #0d9488',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.3)',
                flexShrink: 0,
                background: '#0f172a'
              }}
            >
              <img
                src={bittuKumarImg}
                alt="Smart Medical Care Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
              />
            </div>
            <div className="brand-text-container" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="brand-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Smart Medical Care
              </span>
              <span className="brand-subtitle" style={{ fontSize: '0.68rem', color: '#0d9488', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                AI Diagnostics & Medicine Suite
              </span>
            </div>
          </Link>

          {/* Right side controls: Theme switch + Mobile menu toggle */}
          <div className="nav-controls-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-surface)',
                color: isDark ? '#f59e0b' : '#3b82f6',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.25s ease'
              }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Navigation Menu */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {/* 1. Home */}
          <li>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                color: isActive('/') ? '#0284c7' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: isActive('/') ? 'var(--bg-primary-50, rgba(2, 132, 199, 0.1))' : 'transparent'
              }}
            >
              <Home size={18} /> Home
            </Link>
          </li>

          {/* 2. About */}
          <li>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                color: isActive('/about') ? '#0284c7' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: isActive('/about') ? 'var(--bg-primary-50, rgba(2, 132, 199, 0.1))' : 'transparent'
              }}
            >
              <Info size={18} /> About
            </Link>
          </li>

          {/* 3. Contact */}
          <li>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                color: isActive('/contact') ? '#0284c7' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: isActive('/contact') ? 'var(--bg-primary-50, rgba(2, 132, 199, 0.1))' : 'transparent'
              }}
            >
              <Mail size={18} /> Contact
            </Link>
          </li>

          {/* 3.5. Pre-Doctor Check (100 Features) */}
          <li>
            <Link
              to="/pre-doctor-checker"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${isActive('/pre-doctor-checker') ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 700,
                color: isActive('/pre-doctor-checker') ? '#0d9488' : '#0284c7',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.4rem 0.65rem',
                borderRadius: '8px',
                background: isActive('/pre-doctor-checker') ? 'rgba(13, 148, 136, 0.15)' : 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.2)'
              }}
            >
              <Stethoscope size={18} color="#0d9488" /> Pre-Doctor Check
            </Link>
          </li>

          {/* 4. Dashboard */}
          <li>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                color: isActive('/dashboard') ? '#0284c7' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.4rem 0.6rem',
                borderRadius: '8px',
                background: isActive('/dashboard') ? 'var(--bg-primary-50, rgba(2, 132, 199, 0.1))' : 'transparent'
              }}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>

          {isAdmin && (
            <li>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 700,
                  color: '#ef4444',
                  background: 'var(--danger-bg)',
                  border: '1px solid var(--danger-border)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px'
                }}
              >
                <ShieldAlert size={18} /> Admin Panel
              </Link>
            </li>
          )}

          {/* Auth Actions */}
          {isAuthenticated ? (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: '0.5rem' }}>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px'
                }}
              >
                <User size={18} color="#0284c7" /> {user?.name ? user.name.split(' ')[0] : 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--danger-border)',
                  background: 'var(--danger-bg)',
                  fontWeight: 600,
                  color: '#ef4444'
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          ) : (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginLeft: '0.5rem' }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                  color: '#0284c7',
                  textDecoration: 'none',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  border: '1px solid #0284c7',
                  background: 'transparent'
                }}
              >
                <LogIn size={16} /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0284c7, #0d9488)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                }}
              >
                <UserPlus size={16} /> Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
