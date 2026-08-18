import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import ForgotPassword from './pages/ForgotPassword';
import PreDoctorChecker from './pages/PreDoctorChecker';

import Dashboard from './pages/Dashboard';
import ScanMedicine from './pages/ScanMedicine';
import MyMedicines from './pages/MyMedicines';
import History from './pages/History';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

import './index.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
              <Navbar />
              <div className="main-content" style={{ flex: 1 }}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/pre-doctor-checker" element={<PreDoctorChecker />} />

                  {/* Protected User Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/scan"
                    element={
                      <ProtectedRoute>
                        <ScanMedicine />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-medicines"
                    element={
                      <ProtectedRoute>
                        <MyMedicines />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/history"
                    element={
                      <ProtectedRoute>
                        <History />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reminders"
                    element={
                      <ProtectedRoute>
                        <Reminders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Admin Route */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
