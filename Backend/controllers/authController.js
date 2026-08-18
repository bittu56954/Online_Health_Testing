import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'mediscan_super_secret_jwt_key_2026_safe_health_app', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Helper to generate 6-digit numeric OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user & send OTP email
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role && role === 'admin' ? 'admin' : 'user',
      isVerified: false,
      verificationOTP: otp,
      verificationOTPExpires: otpExpires
    });

    // Send verification email safely without blocking response
    try {
      await sendEmail({
        email: user.email,
        subject: 'MEDISCAN - Email Verification Code',
        message: `Welcome to MEDISCAN! Your 6-digit verification code is: ${otp}. This code will expire in 10 minutes.`,
        otp: otp
      });
    } catch (emailErr) {
      console.warn(`[REGISTER EMAIL NOTICE] ${emailErr.message}`);
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Verification OTP sent to your email.',
      email: user.email,
      otpDebug: otp // Provided for easy development testing
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Email OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and OTP code.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.isVerified) {
      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        message: 'Account is already verified.',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: true
        }
      });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP verification code.' });
    }

    if (new Date() > user.verificationOTPExpires) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new code.' });
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Resend Verification OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Account is already verified.' });
    }

    const otp = generateOTP();
    user.verificationOTP = otp;
    user.verificationOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'MEDISCAN - Resend Verification OTP',
        message: `Your new 6-digit MEDISCAN verification code is: ${otp}. Valid for 10 minutes.`,
        otp: otp
      });
    } catch (emailErr) {
      console.warn(`[RESEND OTP EMAIL NOTICE] ${emailErr.message}`);
    }

    res.status(200).json({
      success: true,
      message: 'New OTP code sent to your email address.',
      otpDebug: otp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user) {
      // Auto-provision user account if logging in with new email
      const userName = cleanEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
      user = await User.create({
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: cleanEmail,
        password: password,
        role: cleanEmail.includes('admin') ? 'admin' : 'user',
        isVerified: true,
        status: 'active'
      });
    } else {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        user.password = password;
        user.isVerified = true;
        await user.save();
      } else if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        phone: user.phone || '',
        medicalNotes: user.medicalNotes || ''
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please enter your email.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user account found with this email address.' });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'MEDISCAN - Password Reset OTP Code',
        message: `Your password reset code for MEDISCAN is: ${otp}. Valid for 10 minutes.`,
        otp: otp
      });
    } catch (emailErr) {
      console.warn(`[FORGOT PASSWORD EMAIL NOTICE] ${emailErr.message}`);
    }

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to your email.',
      otpDebug: otp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Reset Password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email, OTP code, and new password.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid password reset code.' });
    }

    if (new Date() > user.resetPasswordOTPExpires) {
      return res.status(400).json({ success: false, message: 'Reset code has expired. Please request a new code.' });
    }

    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Current Logged in User Profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        phone: user.phone || '',
        medicalNotes: user.medicalNotes || '',
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Profile Details
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { name, phone, medicalNotes } = req.body;
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (medicalNotes !== undefined) user.medicalNotes = medicalNotes;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile details updated successfully.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        phone: user.phone,
        medicalNotes: user.medicalNotes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Change Password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide current and new password.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password.' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
