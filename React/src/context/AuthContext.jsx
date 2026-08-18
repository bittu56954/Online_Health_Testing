import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('mediscan_token') || null);
  const [pendingEmail, setPendingEmail] = useState(localStorage.getItem('mediscan_pending_email') || null);
  const [loading, setLoading] = useState(true);

  // Initialize user profile if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('[MEDISCAN AUTH] Token invalid or expired, clearing session.');
          localStorage.removeItem('mediscan_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login handler
  const loginUser = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      if (res.data.success) {
        const { token: jwtToken, user: userData } = res.data;
        localStorage.setItem('mediscan_token', jwtToken);
        localStorage.removeItem('mediscan_pending_email');
        setToken(jwtToken);
        setUser(userData);
        setPendingEmail(null);
        return { success: true, user: userData };
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.requiresVerification) {
        const unverifiedEmail = err.response.data.email || email;
        localStorage.setItem('mediscan_pending_email', unverifiedEmail);
        setPendingEmail(unverifiedEmail);
        return {
          success: false,
          requiresVerification: true,
          email: unverifiedEmail,
          message: err.response.data.message,
          otpDebug: err.response.data.otpDebug
        };
      }
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.'
      };
    }
  };

  // Register handler
  const registerUser = async (name, email, password, role = 'user') => {
    try {
      const res = await authService.register({ name, email, password, role });
      if (res.data.success) {
        localStorage.setItem('mediscan_pending_email', email);
        setPendingEmail(email);
        return {
          success: true,
          email,
          message: res.data.message,
          otpDebug: res.data.otpDebug
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed.'
      };
    }
  };

  // Verify OTP handler
  const verifyOTP = async (email, otp) => {
    try {
      const res = await authService.verifyOTP({ email, otp });
      if (res.data.success) {
        const { token: jwtToken, user: userData } = res.data;
        localStorage.setItem('mediscan_token', jwtToken);
        localStorage.removeItem('mediscan_pending_email');
        setToken(jwtToken);
        setUser(userData);
        setPendingEmail(null);
        return { success: true, user: userData, message: res.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Invalid or expired OTP code.'
      };
    }
  };

  // Resend OTP handler
  const resendOTP = async (email) => {
    try {
      const res = await authService.resendOTP({ email });
      if (res.data.success) {
        return { success: true, message: res.data.message, otpDebug: res.data.otpDebug };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to resend OTP.'
      };
    }
  };

  // Logout handler
  const logoutUser = () => {
    localStorage.removeItem('mediscan_token');
    localStorage.removeItem('mediscan_pending_email');
    setToken(null);
    setUser(null);
    setPendingEmail(null);
  };

  // Update profile handler
  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        pendingEmail,
        setPendingEmail,
        isAuthenticated: !!user && !!token,
        isAdmin: user?.role === 'admin',
        loginUser,
        registerUser,
        verifyOTP,
        resendOTP,
        logoutUser,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
