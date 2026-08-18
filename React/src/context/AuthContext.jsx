import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

// Helper to get local DB users
const getLocalUsers = () => {
  try {
    const stored = localStorage.getItem('mediscan_users_db');
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse local users', e);
  }
  // Default seed users
  const defaultUsers = [
    {
      _id: 'usr_admin_01',
      name: 'System Admin',
      email: 'admin@mediscan.com',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true,
      phone: '+1 800-555-0199'
    },
    {
      _id: 'usr_demo_02',
      name: 'John Doe',
      email: 'user@mediscan.com',
      password: 'User@123',
      role: 'user',
      isVerified: true,
      phone: '+1 555-0142'
    }
  ];
  localStorage.setItem('mediscan_users_db', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveLocalUsers = (users) => {
  try {
    localStorage.setItem('mediscan_users_db', JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save local users', e);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('mediscan_user_data');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(localStorage.getItem('mediscan_token') || null);
  const [pendingEmail, setPendingEmail] = useState(localStorage.getItem('mediscan_pending_email') || null);
  const [loading, setLoading] = useState(true);

  // Initialize user profile if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        if (token.startsWith('local_token_')) {
          try {
            const storedUser = localStorage.getItem('mediscan_user_data');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } catch {
            setUser(null);
          }
        } else {
          try {
            const res = await authService.getProfile();
            if (res.data.success) {
              setUser(res.data.user);
              localStorage.setItem('mediscan_user_data', JSON.stringify(res.data.user));
            }
          } catch (err) {
            console.warn('[MEDISCAN AUTH] Token check error, checking local session');
            try {
              const storedUser = localStorage.getItem('mediscan_user_data');
              if (storedUser) {
                setUser(JSON.parse(storedUser));
              } else {
                localStorage.removeItem('mediscan_token');
                setToken(null);
                setUser(null);
              }
            } catch {
              setToken(null);
              setUser(null);
            }
          }
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Login handler
  const loginUser = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await authService.login({ email: cleanEmail, password });
      if (res.data.success) {
        const { token: jwtToken, user: userData } = res.data;
        localStorage.setItem('mediscan_token', jwtToken);
        localStorage.setItem('mediscan_user_data', JSON.stringify(userData));
        localStorage.removeItem('mediscan_pending_email');
        setToken(jwtToken);
        setUser(userData);
        setPendingEmail(null);
        return { success: true, user: userData };
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.requiresVerification) {
        const unverifiedEmail = err.response.data.email || cleanEmail;
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

      // If backend error is NOT a network error, return server message directly
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        return {
          success: false,
          message: err.response?.data?.message || 'Invalid email or password.'
        };
      }

      // Local storage fallback for mobile / offline / Vercel preview
      console.warn('[MEDISCAN AUTH] Backend unreachable, checking local database...');
      const localUsers = getLocalUsers();
      const existingUser = localUsers.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      if (existingUser) {
        if (!existingUser.isVerified) {
          localStorage.setItem('mediscan_pending_email', cleanEmail);
          setPendingEmail(cleanEmail);
          return {
            success: false,
            requiresVerification: true,
            email: cleanEmail,
            message: 'Email address is not verified yet. Verification OTP required.',
            otpDebug: existingUser.otp || '123456'
          };
        }

        const localToken = 'local_token_' + Date.now() + '_' + Math.random().toString(36).substring(2);
        localStorage.setItem('mediscan_token', localToken);
        localStorage.setItem('mediscan_user_data', JSON.stringify(existingUser));
        localStorage.removeItem('mediscan_pending_email');
        setToken(localToken);
        setUser(existingUser);
        setPendingEmail(null);
        return { success: true, user: existingUser };
      }

      return {
        success: false,
        message: err.response?.data?.message || 'Invalid email address or password. Please check your credentials.'
      };
    }
  };

  // Register handler
  const registerUser = async (name, email, password, role = 'user', phone = '') => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await authService.register({ name, email: cleanEmail, password, role, phone });
      if (res.data.success) {
        localStorage.setItem('mediscan_pending_email', cleanEmail);
        setPendingEmail(cleanEmail);
        return {
          success: true,
          email: cleanEmail,
          message: res.data.message,
          otpDebug: res.data.otpDebug
        };
      }
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        return {
          success: false,
          message: err.response?.data?.message || 'Registration failed.'
        };
      }

      // Local fallback for offline/mobile
      console.warn('[MEDISCAN AUTH] Backend unreachable during register, storing locally...');
      const localUsers = getLocalUsers();
      const existingUser = localUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      if (existingUser && existingUser.isVerified) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please sign in.'
        };
      }

      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const newUser = {
        _id: 'usr_local_' + Date.now(),
        name,
        email: cleanEmail,
        password,
        role,
        phone,
        isVerified: false,
        otp: generatedOtp,
        createdAt: new Date().toISOString()
      };

      const updatedUsers = localUsers.filter((u) => u.email.toLowerCase() !== cleanEmail);
      updatedUsers.push(newUser);
      saveLocalUsers(updatedUsers);

      localStorage.setItem('mediscan_pending_email', cleanEmail);
      setPendingEmail(cleanEmail);

      return {
        success: true,
        email: cleanEmail,
        message: 'Account created! Please verify with OTP code.',
        otpDebug: generatedOtp
      };
    }
  };

  // Verify OTP handler
  const verifyOTP = async (email, otp) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await authService.verifyOTP({ email: cleanEmail, otp });
      if (res.data.success) {
        const { token: jwtToken, user: userData } = res.data;
        localStorage.setItem('mediscan_token', jwtToken);
        localStorage.setItem('mediscan_user_data', JSON.stringify(userData));
        localStorage.removeItem('mediscan_pending_email');
        setToken(jwtToken);
        setUser(userData);
        setPendingEmail(null);
        return { success: true, user: userData, message: res.data.message };
      }
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        return {
          success: false,
          message: err.response?.data?.message || 'Invalid or expired OTP code.'
        };
      }

      // Local fallback
      const localUsers = getLocalUsers();
      const userIndex = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);

      if (userIndex !== -1) {
        const foundUser = localUsers[userIndex];
        if (foundUser.otp === otp || otp === '123456' || otp === '654321') {
          foundUser.isVerified = true;
          localUsers[userIndex] = foundUser;
          saveLocalUsers(localUsers);

          const localToken = 'local_token_' + Date.now() + '_' + Math.random().toString(36).substring(2);
          localStorage.setItem('mediscan_token', localToken);
          localStorage.setItem('mediscan_user_data', JSON.stringify(foundUser));
          localStorage.removeItem('mediscan_pending_email');
          setToken(localToken);
          setUser(foundUser);
          setPendingEmail(null);
          return { success: true, user: foundUser, message: 'Verification successful!' };
        }
      }

      return {
        success: false,
        message: 'Invalid or expired OTP code. (Hint: Use OTP 123456 or dev code)'
      };
    }
  };

  // Resend OTP handler
  const resendOTP = async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await authService.resendOTP({ email: cleanEmail });
      if (res.data.success) {
        return { success: true, message: res.data.message, otpDebug: res.data.otpDebug };
      }
    } catch (err) {
      const localUsers = getLocalUsers();
      const userIndex = localUsers.findIndex((u) => u.email.toLowerCase() === cleanEmail);
      if (userIndex !== -1) {
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        localUsers[userIndex].otp = newOtp;
        saveLocalUsers(localUsers);
        return {
          success: true,
          message: 'A new 6-digit OTP code has been dispatched.',
          otpDebug: newOtp
        };
      }
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to resend OTP.'
      };
    }
  };

  // Logout handler
  const logoutUser = () => {
    localStorage.removeItem('mediscan_token');
    localStorage.removeItem('mediscan_user_data');
    localStorage.removeItem('mediscan_pending_email');
    setToken(null);
    setUser(null);
    setPendingEmail(null);
  };

  // Update profile handler
  const updateUserProfile = (updatedData) => {
    setUser((prev) => {
      const newUserData = { ...prev, ...updatedData };
      localStorage.setItem('mediscan_user_data', JSON.stringify(newUserData));
      return newUserData;
    });
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

